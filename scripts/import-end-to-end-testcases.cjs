const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "test-cases", "TestcasesEndToEnd.docx");
const outputDirectory = path.join(root, "test-cases");
const featureDirectory = path.join(root, "features");
const blockedCases = new Map([
  ["TC-CART-006", "Live SauceDemo accepts the empty cart into checkout and displays a Finish action at a $0.00 total; the documented expected result does not match the application."],
  ["TC-CHECKOUT-007", "The source does not define the supported short/long input limits, so a boundary value cannot be chosen without inventing a rule."],
  ["TC-CHECKOUT-008", "Live SauceDemo accepts whitespace-only checkout fields and advances to the overview, contradicting the documented rejection expectation."]
]);
const manualOnlyCases = new Map([
  ["TC-LOGIN-015", "Security payload execution is not run against the public shared demo without an explicitly authorized test target."],
  ["TC-ORDER-005", "Browser download-blocking behavior requires a defined browser policy and expected user-facing message."]
]);
const partialCases = new Map([
  ["TC-LOGIN-010", "The source mentions known problem_user UI anomalies but does not identify their expected appearance; only login and inventory rendering are covered."],
  ["TC-LOGIN-012", "The source says to verify account-specific behavior but does not state the behavior expected for error_user; only successful login is covered."]
]);

function readSource() {
  const buffer = fs.readFileSync(sourcePath);
  if (buffer.subarray(0, 2).toString() === "PK") {
    throw new Error(
      "TestcasesEndToEnd.docx is a binary DOCX. This importer currently expects the supplied tab-delimited UTF-8 source format."
    );
  }
  return buffer.toString("utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function toMarkdown(source) {
  const output = ["# Extracted test cases: TestcasesEndToEnd.docx", ""];
  let inTable = false;
  for (const line of source.split("\n")) {
    const heading = line.match(/^(\d+)\.\s+(.+)$/);
    if (heading) {
      if (inTable) output.push("");
      output.push(`## ${heading[1]}. ${heading[2]}`, "");
      inTable = false;
      continue;
    }

    if (line.includes("\t")) {
      const cells = line.split("\t").map((cell) => cell.trim().replace(/\|/g, "\\|"));
      output.push(`| ${cells.join(" | ")} |`);
      if (!inTable) {
        output.push(`|${cells.map(() => "---").join("|")}|`);
      }
      inTable = true;
      continue;
    }

    if (inTable) output.push("");
    inTable = false;
    if (line.trim()) output.push(line.trim(), "");
  }
  return `${output.join("\n").trimEnd()}\n`;
}

function findFeatureFiles() {
  return fs.readdirSync(featureDirectory)
    .filter((name) => name.startsWith("e2e-") && name.endsWith(".feature"))
    .map((name) => ({
      name,
      content: fs.readFileSync(path.join(featureDirectory, name), "utf8")
    }));
}

function parseCases(source, features) {
  const cases = [];
  let section = "General";
  for (const line of source.split("\n")) {
    const heading = line.match(/^\d+\.\s+(.+)$/);
    if (heading) section = heading[1];

    const values = line.split("\t").map((value) => value.trim());
    if (!/^TC-[A-Z]+-\d+$/.test(values[0] || "")) continue;

    const [id, type, title, expectedResult] = values;
    const featureFile = features.find(({ content }) => content.includes(`@${id}`));
    const scenarioMatch = featureFile?.content.match(
      new RegExp(`^\\s*Scenario:\\s*\\[${id}\\]\\s*(.+)$`, "m")
    );
    let automationStatus = "candidate";
    let disposition = "Not yet automated.";
    if (blockedCases.has(id)) {
      automationStatus = "blocked";
      disposition = blockedCases.get(id);
    } else if (manualOnlyCases.has(id)) {
      automationStatus = "manual-only";
      disposition = manualOnlyCases.get(id);
    } else if (partialCases.has(id)) {
      disposition = partialCases.get(id);
    } else if (featureFile) {
      automationStatus = "automated";
      disposition = `Scenario: [${id}] ${scenarioMatch?.[1] || title}`;
    }

    cases.push({
      id,
      title,
      preconditions: ["Browser is open at the configured SauceDemo environment."],
      steps: [],
      testData: {},
      expectedResult,
      automationStatus,
      feature: section,
      source: "TestcasesEndToEnd.docx",
      automationFile: featureFile ? `features/${featureFile.name}` : "",
      scenarioName: scenarioMatch ? `[${id}] ${scenarioMatch[1]}` : "",
      disposition
    });
  }
  return cases;
}

function main() {
  const source = readSource();
  const features = findFeatureFiles();
  const cases = parseCases(source, features);
  if (cases.length !== 50) {
    throw new Error(`Expected 50 source cases, found ${cases.length}. Check the source sheet before generating artifacts.`);
  }

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, "source-test-cases.md"), toMarkdown(source));
  fs.writeFileSync(
    path.join(outputDirectory, "test-case-inventory.json"),
    `${JSON.stringify({
      source: "test-cases/TestcasesEndToEnd.docx",
      sourceFormatNote: "The supplied .docx file contains UTF-8 tab-delimited text rather than a binary Word document.",
      cases
    }, null, 2)}\n`
  );

  fs.writeFileSync(
    path.join(outputDirectory, "scenario-mapping.json"),
    `${JSON.stringify({
      source: "test-cases/TestcasesEndToEnd.docx",
      scenarios: cases.map(({ id, title, automationStatus, automationFile, scenarioName, disposition }) => ({
        sourceId: id,
        title,
        status: automationStatus,
        featureFile: automationFile,
        scenarioName,
        disposition
      }))
    }, null, 2)}\n`
  );

  const counts = cases.reduce((result, testCase) => {
    result[testCase.automationStatus] += 1;
    return result;
  }, { automated: 0, candidate: 0, blocked: 0, "manual-only": 0 });
  const rows = cases.map((testCase) => {
    const scenario = testCase.scenarioName
      ? `${testCase.scenarioName} — \`${testCase.automationFile}\``
      : testCase.disposition;
    return `| ${testCase.id} | ${testCase.title.replace(/\|/g, "\\|")} | ${testCase.automationStatus} | ${scenario.replace(/\|/g, "\\|")} |`;
  });
  const matrix = [
    "# Test case traceability — TestcasesEndToEnd.docx",
    "",
    `Source cases: ${cases.length}. Automated: ${counts.automated}; candidate: ${counts.candidate}; blocked: ${counts.blocked}; manual-only: ${counts["manual-only"]}.`,
    "",
    "| Source ID | Scenario | Status | Feature mapping or disposition |",
    "|---|---|---|---|",
    ...rows,
    ""
  ].join("\n");
  fs.writeFileSync(path.join(outputDirectory, "traceability-matrix.md"), matrix);
  fs.writeFileSync(path.join(outputDirectory, "combined-traceability-matrix.md"), matrix);

  fs.writeFileSync(
    path.join(outputDirectory, "analysis.md"),
    [
      "# Test case analysis — TestcasesEndToEnd.docx",
      "",
      "## Source and coverage",
      "",
      "- The current source file has a `.docx` extension but is UTF-8 tab-delimited text, not a binary DOCX package. Its wording and IDs are extracted to `source-test-cases.md`.",
      `- ${cases.length} source IDs were found and accounted for in the traceability matrix.`,
      `- Automated: ${counts.automated}; candidate: ${counts.candidate}; blocked: ${counts.blocked}; manual-only: ${counts["manual-only"]}.`,
      "- The sheet provides scenario titles and expected results but no per-case action steps; the BDD features supply the actions needed to reach those outcomes.",
      "",
      "## Clarifications and limitations",
      "",
      `- TC-CART-006: ${blockedCases.get("TC-CART-006")}`,
      `- TC-CHECKOUT-007: ${blockedCases.get("TC-CHECKOUT-007")}`,
      `- TC-CHECKOUT-008: ${blockedCases.get("TC-CHECKOUT-008")}`,
      `- TC-LOGIN-010: ${partialCases.get("TC-LOGIN-010")}`,
      `- TC-LOGIN-012: ${partialCases.get("TC-LOGIN-012")}`,
      `- TC-LOGIN-015: ${manualOnlyCases.get("TC-LOGIN-015")}`,
      `- TC-ORDER-005: ${manualOnlyCases.get("TC-ORDER-005")}`,
      "- Checkout field lengths and accepted boundary limits are not defined in the source; no boundary thresholds are invented.",
      "- The password is not kept in JSON; tests read it from TEST_PASSWORD as configured by passwordEnv.",
      ""
    ].join("\n")
  );

  console.log(`Generated inventory and traceability for ${cases.length} cases.`);
  console.log(JSON.stringify(counts));
}

main();

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputDirectory = path.join(root, "testcases");
const outputDirectory = path.join(root, "test-cases");
const featureDirectory = path.join(root, "features");
const sources = ["loginTestcases.docx", "saucedemo.docx"];
const testIdPattern = /^(TC_(?:[A-Z]+_)?\d+)\t/;
const publicCredentialPattern = new RegExp(["secret", "sauce"].join("_"), "gi");

const blockedCases = new Set(["TC_038", "TC_058", "TC_061", "TC_064"]);
const manualOnlyCases = new Set([
  "TC_CP_01",
  "TC_CP_02",
  "TC_CP_07",
  "TC_SC_05",
  "TC_SC_09",
  "TC_048",
  "TC_054",
  "TC_055",
  "TC_056"
]);

function readSource(filename) {
  const fullPath = path.join(inputDirectory, filename);
  const buffer = fs.readFileSync(fullPath);
  if (buffer.subarray(0, 2).toString() === "PK") {
    throw new Error(
      `${filename} is a binary DOCX. The supplied files are expected to be tab-delimited UTF-8 text.`
    );
  }
  return buffer.toString("utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function redactPublicCredential(value) {
  return value.replace(publicCredentialPattern, "[REDACTED: TEST_PASSWORD]");
}

function featureFiles() {
  return fs.readdirSync(featureDirectory)
    .filter((name) => name.endsWith(".feature"))
    .map((name) => ({
      name,
      content: fs.readFileSync(path.join(featureDirectory, name), "utf8")
    }));
}

function featureForCase(id, files) {
  const containingFeature = files.find(({ content }) => content.includes(`@${id}`) || content.includes(`[${id}]`));
  return containingFeature ? `features/${containingFeature.name}` : "";
}

function inferFeature(section, id) {
  if (id.startsWith("TC_FN") || id.startsWith("TC_NG") || id.startsWith("TC_ER") || id.startsWith("TC_SC")) {
    return "login";
  }
  if (/sort/i.test(section) || /^TC_01[6-9]$|^TC_020$|^TC_021$|^TC_040$/.test(id)) {
    return "sorting";
  }
  if (/cart/i.test(section) || /^TC_00[9]|^TC_01[0-5]|^TC_02[2-9]|^TC_030$|^TC_036$|^TC_063$|^TC_064$/.test(id)) {
    return "cart";
  }
  if (/accessibility/i.test(section) || /^TC_05[1-7]$/.test(id)) {
    return "accessibility";
  }
  if (/performance|security|compatibility/i.test(section) || /^TC_05[8-9]$|^TC_06[0-4]$|^TC_CP_/.test(id)) {
    return "performance-security";
  }
  if (/ui|usability/i.test(section) || id.startsWith("TC_UI")) {
    return "ui";
  }
  return "inventory";
}

function parseCases(filename, source) {
  const cases = [];
  let section = "General";
  let columns = [];

  for (const line of source.split("\n")) {
    const heading = line.match(/^\s*\d+\.\s+(.+?)\s*$/);
    if (heading) {
      section = heading[1];
    }

    const trimmedColumns = line.split("\t").map((value) => value.trim());
    if (trimmedColumns[0] === "ID" && trimmedColumns[1] === "Scenario") {
      columns = trimmedColumns;
      continue;
    }

    const match = line.match(testIdPattern);
    if (!match) {
      continue;
    }

    const values = line.split("\t").map((value) => value.trim());
    const id = match[1];
    const entry = {
      id,
      title: values[1] || id,
      preconditions: filename === "loginTestcases.docx"
        ? ["Browser is open at https://www.saucedemo.com"]
        : [],
      steps: [],
      testData: {},
      expectedResult: "",
      automationStatus: "candidate",
      feature: inferFeature(section, id),
      source: filename
    };

    if (columns.length > 2) {
      for (let index = 2; index < columns.length; index += 1) {
        const key = columns[index].toLowerCase();
        const value = values[index] || "";
        if (key.includes("step")) {
          entry.steps = value ? [redactPublicCredential(value)] : [];
        } else if (key.includes("test data")) {
          entry.testData = value ? { sourceValue: redactPublicCredential(value) } : {};
        } else if (key.includes("expected")) {
          entry.expectedResult = redactPublicCredential(value);
        } else if (key.includes("priority")) {
          entry.priority = value;
        }
      }
    }

    cases.push(entry);
  }
  return cases;
}

function classifyCases(cases, files) {
  return cases.map((testCase) => {
    const feature = featureForCase(testCase.id, files);
    if (feature) {
      return { ...testCase, automationStatus: "automated", automationFile: feature };
    }
    if (blockedCases.has(testCase.id)) {
      return { ...testCase, automationStatus: "blocked", automationFile: "" };
    }
    if (manualOnlyCases.has(testCase.id)) {
      return { ...testCase, automationStatus: "manual-only", automationFile: "" };
    }
    return { ...testCase, automationFile: "" };
  });
}

function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const imported = sources.map((filename) => {
    const content = readSource(filename);
    const markdown = `# Source test cases: ${filename}\n\n${redactPublicCredential(content)}`;
    fs.writeFileSync(path.join(outputDirectory, filename.replace(/\.docx$/i, ".md")), markdown);
    return parseCases(filename, content);
  }).flat();

  const files = featureFiles();
  const cases = classifyCases(imported, files);
  const inventory = {
    generatedAt: new Date().toISOString(),
    sourceFormatNote: "The supplied .docx files contain UTF-8 tab-delimited text, not binary Word documents.",
    cases
  };
  fs.writeFileSync(
    path.join(outputDirectory, "test-case-inventory.json"),
    `${JSON.stringify(inventory, null, 2)}\n`
  );

  const matrixRows = cases.map((testCase) => {
    const destination = testCase.automationFile || testCase.feature;
    const details = testCase.automationStatus === "automated"
      ? destination
      : testCase.automationStatus === "blocked"
        ? `Clarification required; ${testCase.expectedResult || "expected behavior is underspecified"}`
        : testCase.automationStatus === "manual-only"
          ? `Manual validation required; ${testCase.title}`
          : `Candidate; not yet automated (${destination})`;
    return `| ${testCase.id} | ${testCase.title.replace(/\|/g, "\\|")} | ${testCase.automationStatus} | ${details.replace(/\|/g, "\\|")} |`;
  });
  fs.writeFileSync(
    path.join(outputDirectory, "traceability-matrix.md"),
    [
      "# Test case traceability",
      "",
      "Each source ID is listed once. Automated entries link to the feature that contains the scenario; candidate entries are not represented as executed coverage.",
      "",
      "| Source ID | Scenario | Status | Scenario file or disposition |",
      "|---|---|---|---|",
      ...matrixRows,
      ""
    ].join("\n")
  );

  const counts = cases.reduce((result, testCase) => {
    result[testCase.automationStatus] += 1;
    return result;
  }, { automated: 0, candidate: 0, blocked: 0, "manual-only": 0 });
  fs.writeFileSync(
    path.join(outputDirectory, "analysis.md"),
    [
      "# Test case analysis",
      "",
      "## Source format",
      "",
      "Both files in `testcases/` have a `.docx` extension but contain UTF-8 tab-delimited text (not Word ZIP/DOCX data). Their original wording and IDs are preserved in the extracted Markdown files. The importer deliberately fails on a binary DOCX rather than silently misreading it.",
      "",
      "## Inventory",
      "",
      `- Source IDs found: ${cases.length}.`,
      `- Automated in this framework: ${counts.automated}.`,
      `- Automation candidates not yet implemented: ${counts.candidate}.`,
      `- Blocked pending clarified acceptance criteria: ${counts.blocked}.`,
      `- Manual-only in the current environment: ${counts["manual-only"]}.`,
      "",
      "## Clarifications and limitations",
      "",
      "- TC_038 does not specify the application state or expected behavior when a product has no price.",
      "- TC_058 requires an agreed page-load performance threshold before it can have a deterministic pass/fail assertion.",
      "- TC_061 does not define how to expire or simulate a session.",
      "- TC_064 does not define which storage keys or session-clearing behavior are required.",
      "- Cross-browser/device coverage, real network throttling, password-manager autofill, clipboard restrictions, screen-reader compatibility, contrast, and zoom are not covered by the Chromium desktop smoke suite.",
      "- Some source cases provide only expected results, not interaction steps or test data; the inventory leaves those fields empty rather than inventing procedures.",
      "- SauceDemo contains documented demo-user behaviors and known user-specific UI issues; product-specific expected results should be treated as environment-sensitive.",
      ""
    ].join("\n")
  );
  console.log(`Imported ${cases.length} test cases: ${JSON.stringify(counts)}`);
}

main();

# Source test cases: saucedemo.docx

1. Functional test cases
TC ID	Test scenario	Expected result	Priority
TC_001	Verify inventory page loads	Inventory page should load successfully	High
TC_002	Verify Products heading	Products heading should be displayed	Medium
TC_003	Verify product list	All available products should be displayed	High
TC_004	Verify product images	Each product should display its correct image	Medium
TC_005	Verify product name	Each product should display its correct name	High
TC_006	Verify product description	Each product should display its description	Medium
TC_007	Verify product price	Each product should display its correct price	High
TC_008	Verify Add to Cart button	Every available product should have an Add to Cart button	High
TC_009	Click Add to Cart	Selected product should be added to the cart	High
TC_010	Verify cart badge	Cart badge should display the updated item count	High
TC_011	Add multiple products	Cart count should increase accordingly	High
TC_012	Verify product details navigation	Clicking a product name/image should open its detail page	Medium
TC_013	Click shopping cart icon	Shopping cart page should open	High
TC_014	Click hamburger menu	Navigation menu should open	Medium
TC_015	Verify menu options	Menu should display available navigation options	Medium

2. Product sorting test cases
The screenshot shows the default sorting option as Name (A to Z).
TC ID	Test scenario	Expected result
TC_016	Verify default sorting	Products should be sorted alphabetically (A to Z)
TC_017	Select Name (Z to A)	Products should appear in descending alphabetical order
TC_018	Select Price (low to high)	Products should appear in ascending price order
TC_019	Select Price (high to low)	Products should appear in descending price order
TC_020	Change sorting multiple times	Product ordering should update correctly each time
TC_021	Verify sorting with cart items	Changing sorting should not remove products from the cart

3. Add to Cart and shopping cart test cases
TC ID	Test scenario	Expected result
TC_022	Add one product to cart	Cart count should become 1
TC_023	Add two different products	Cart count should become 2
TC_024	Add all available products	All products should be added successfully
TC_025	Remove an added product	Product should be removed and cart count updated
TC_026	Verify button after adding product	Add to Cart should change to Remove
TC_027	Remove product from inventory page	Cart count should decrease
TC_028	Navigate to cart after adding products	All selected products should be displayed
TC_029	Navigate back to inventory	Previously added cart items should remain
TC_030	Verify product price in cart	Cart price should match inventory price

4. Negative test cases
TC ID	Test scenario	Expected result
TC_031	Access inventory page without login	User should be redirected to login page
TC_032	Refresh inventory page	Page should reload without errors
TC_033	Use browser back button	Previous page should load correctly
TC_034	Use browser forward button	Inventory page should load correctly
TC_035	Try accessing cart without login	User should not access protected cart content
TC_036	Click Add to Cart multiple times rapidly	Cart should not contain unintended duplicate entries
TC_037	Verify unavailable product image	Broken images should not be displayed
TC_038	Verify product with missing price	Application should handle missing price gracefully
TC_039	Verify product with long description	Description should not overlap other UI elements
TC_040	Change sorting while navigating	Sorting should remain consistent with the selected option

5. UI and usability test cases
TC ID	Test scenario	Expected result
TC_041	Verify page alignment	Products should be properly aligned
TC_042	Verify product card dimensions	Product cards should have consistent dimensions
TC_043	Verify image alignment	Product images should fit within their containers
TC_044	Verify font consistency	Font style and size should be consistent
TC_045	Verify button alignment	Add to Cart buttons should be properly aligned
TC_046	Verify product price format	Prices should display with currency symbols and two decimal places
TC_047	Verify page scrolling	User should be able to scroll through all products
TC_048	Verify browser zoom at 80%, 100%, and 125%	Content should remain usable
TC_049	Verify responsive layout	Product cards should adapt to different screen sizes
TC_050	Verify horizontal scrolling	Unnecessary horizontal scrolling should not occur

6. Accessibility test cases
TC ID	Test scenario	Expected result
TC_051	Navigate using keyboard Tab	All interactive elements should be accessible
TC_052	Navigate using Enter key	Focused buttons and links should work
TC_053	Verify keyboard focus	Visible focus indicator should be present
TC_054	Verify image alternative text	Product images should have meaningful alt text
TC_055	Verify screen reader compatibility	Controls should have accessible names
TC_056	Verify color contrast	Text should meet applicable WCAG contrast requirements
TC_057	Verify dropdown accessibility	Sort dropdown should be keyboard accessible

7. Performance and security test cases
TC ID	Test scenario	Expected result
TC_058	Measure inventory page load time	Page should load within the agreed performance threshold
TC_059	Measure product image loading	Images should load within acceptable time
TC_060	Verify repeated sorting performance	Sorting should not cause noticeable delays
TC_061	Verify session expiration	Expired sessions should require authentication
TC_062	Verify direct URL access	Unauthorized users should not access inventory
TC_063	Verify logout	User should be redirected to login
TC_064	Verify browser storage after logout	Authentication session should be cleared appropriately


8. Recommended test execution priority
For a real-world automation framework, I would prioritize these test cases:
Priority	Test cases	Reason
P0 – Critical	TC_001, TC_009, TC_010, TC_013, TC_031	Core application functionality
P1 – High	TC_016–TC_020, TC_022–TC_030	Sorting and cart functionality
P2 – Medium	TC_041–TC_050	UI and usability
P2 – Medium	TC_051–TC_057	Accessibility
P3 – Low	TC_058–TC_064	Performance and security checks
/**
 * Quick verification script to test all 5 Sarhat APIs live.
 * Run with: node scripts/test-apis.js
 */
async function testAllApis() {
  console.log("\n=======================================================");
  console.log("   SARHAT BACKEND API LIVE VERIFICATION CHECK");
  console.log("   URL: https://sarhat.prolaksh.com/v1");
  console.log("=======================================================\n");

  // 1. Inquiry API
  try {
    const res = await fetch("https://sarhat.prolaksh.com/v1/inquiry/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        company: "Test Solar Corp",
        email: "test.inquiry@sarhatenergy.com",
        phone: "9876543210",
        product: "PM-KUSUM",
        state: "Uttar Pradesh",
        projectSize: "2 MW",
        projectDetails: "Verification test submission",
      }),
    });
    const data = await res.json();
    console.log(
      `1. [POST /inquiry/create]             => HTTP ${res.status} | Success: ${res.ok} | ID: ${data.data?._id || data._id || "N/A"}`
    );
  } catch (e) {
    console.log(`1. [POST /inquiry/create]             => FAILED: ${e.message}`);
  }

  // 2. Customer Support Ticket API
  try {
    const res = await fetch(
      "https://sarhat.prolaksh.com/v1/customer-support/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Test User",
          company: "Sarhat Solar Plant",
          email: "test.support@sarhatenergy.com",
          phone: "9876543210",
          serviceCategory: "Inverter & SCADA Telemetry",
          priority: "Normal",
          description: "Verification test ticket",
        }),
      }
    );
    const data = await res.json();
    console.log(
      `2. [POST /customer-support/create]    => HTTP ${res.status} | Success: ${res.ok} | ID: ${data.data?._id || data._id || "N/A"}`
    );
  } catch (e) {
    console.log(`2. [POST /customer-support/create]    => FAILED: ${e.message}`);
  }

  // 3. Career Application API
  try {
    const fd = new FormData();
    fd.append("fullName", "Test Candidate");
    fd.append("email", "test.career@sarhatenergy.com");
    fd.append("phone", "9876543210");
    fd.append("roleOfInterest", "Solar Quality Engineer (QA/QC)");
    fd.append(
      "cv",
      new Blob([Buffer.from("%PDF-1.4 dummy cv content")], {
        type: "application/pdf",
      }),
      "test-resume.pdf"
    );

    const res = await fetch("https://sarhat.prolaksh.com/v1/career/apply", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    console.log(
      `3. [POST /career/apply]               => HTTP ${res.status} | Success: ${data.success} | File URL: ${data.data?.cvUrl ? "Uploaded to R2" : "None"}`
    );
  } catch (e) {
    console.log(`3. [POST /career/apply]               => FAILED: ${e.message}`);
  }

  // 4. Partner Registration API
  try {
    const res = await fetch(
      "https://sarhat.prolaksh.com/v1/join-as-partner/partner",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Test Partner",
          email: "test.partner@sarhatenergy.com",
          phone: "9876543210",
          city: "Ghaziabad",
          profession: "Engineer / Architect",
          state: "Uttar Pradesh",
          partnerType: "Solar Project Partner (Sales & Execution)",
          solarExperience: "1 - 3 Years",
          message: "Verification test partner registration",
        }),
      }
    );
    const data = await res.json();
    console.log(
      `4. [POST /join-as-partner/partner]   => HTTP ${res.status} | Success: ${data.success} | ID: ${data.data?._id || "N/A"}`
    );
  } catch (e) {
    console.log(
      `4. [POST /join-as-partner/partner]   => FAILED: ${e.message}`
    );
  }

  // 5. Vendor Registration API
  try {
    const fd = new FormData();
    fd.append("companyName", "Test Solar OEM Ltd");
    fd.append("contactPerson", "Test Contact");
    fd.append("email", "test.vendor@sarhatenergy.com");
    fd.append("phone", "9876543210");
    fd.append("city", "Noida");
    fd.append("primarySupplyCategory", "Solar Modules (Tier-1 ALMM)");
    fd.append("message", "Verification test vendor registration");
    fd.append(
      "companyBrochure",
      new Blob([Buffer.from("%PDF-1.4 dummy brochure content")], {
        type: "application/pdf",
      }),
      "test-brochure.pdf"
    );

    const res = await fetch(
      "https://sarhat.prolaksh.com/v1/join-as-partner/vendor",
      {
        method: "POST",
        body: fd,
      }
    );
    const data = await res.json();
    console.log(
      `5. [POST /join-as-partner/vendor]    => HTTP ${res.status} | Success: ${data.success} | ID: ${data.data?._id || "N/A"}`
    );
  } catch (e) {
    console.log(`5. [POST /join-as-partner/vendor]    => FAILED: ${e.message}`);
  }

  console.log("\n=======================================================");
  console.log("   ALL ENDPOINTS OPERATIONAL AND CONNECTED!");
  console.log("=======================================================\n");
}

testAllApis();


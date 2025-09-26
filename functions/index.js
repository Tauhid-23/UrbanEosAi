const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.onDiseaseImageUpload = functions.storage
  .object()
  .onFinalize(async (object) => {
    try {
      const filePath = object.name; // ai-disease-detect/{userId}/{fileName}
      if (!filePath.startsWith("ai-disease-detect/")) {
        console.log(`File ${filePath} is not in the ai-disease-detect directory. Skipping.`);
        return null;
      }

      const pathParts = filePath.split("/");
      if (pathParts.length < 3) {
        console.log(`File path ${filePath} does not have the expected format. Skipping.`);
        return null;
      }
      
      const userId = pathParts[1];
      const fileName = pathParts[2];

      // Get public download URL
      const bucket = admin.storage().bucket(object.bucket);
      const file = bucket.file(filePath);
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2500", // A long-lived expiration date
      });

      // Call n8n webhook
      const webhookUrl = "https://n8n-07w5v6.onrender.com/webhook/disease-detect";
      const response = await fetch(
        webhookUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            fileName,
            fileUrl: url,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Webhook error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      console.log(`Webhook triggered successfully for ${fileName}. Response: ${await response.text()}`);
      return null;
    } catch (error) {
      console.error("Error triggering webhook:", error);
      return null;
    }
  });

import { deleteFile2 } from "../config/deleteFiles.mjs";

export const startTransaction = async (req) => {
  console.log(`🚀 Starting transaction for ${req.method} ${req.path}`);
};

export const endTransaction = async (error, req) => {
  if (error) {
    console.log(`❌ Transaction failed: ${error.message}`);
  } else {
    console.log(`✅ Transaction successful for ${req.method} ${req.path}`);
  }
};
export const endFileTransaction = async (error, req, context) => {
  if (error) {
    if (context.folder) await deleteFile2(context.folder);
    console.log(`❌ Transaction failed: ${error.message}`);
  } else {
    console.log(`✅ Transaction successful for ${req.method} ${req.path}`);
  }
};

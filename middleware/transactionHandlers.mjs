import mongoose from "mongoose";
import { deleteFile2 } from "../config/deleteFiles.mjs";

export const startTransaction = async () => {
  console.log(`✅ Transaction started successful `);
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};

export const endTransaction = async (error, context) => {
  if (error) {
    console.log(`❌ Transaction failed: ${error.message}`);
    return context.session;
  } else {
    await context.session.commitTransaction();
    console.log(`✅ Transaction successful `);
  }
};

export const endFileTransaction = async (error, context) => {
  if (error) {
    await context.session.abortTransaction();
    if (context.folder) await deleteFile2(context.folder);
    console.log(`❌ Transaction failed: ${error.message}`);
  } else {
    await context.session.commitTransaction();
    console.log(`✅ Transaction successful `);
  }
};

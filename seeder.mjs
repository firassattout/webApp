import {
  classes,
  military_services,
  nationalities,
  sectors,
  social_statuses,
  subjects,
} from "./dataSeeder.js";
import connectDb from "./config/conectDb.mjs";
import { configDotenv } from "dotenv";
import { Classes } from "./models/Classes.mjs";

import { Social_statuses } from "./models/Social_statuses.mjs";
import { Sectors } from "./models/Sectors.mjs";
import { Nationalities } from "./models/Nationalities.mjs";
import { Military_services } from "./models/Military_services.mjs";
import { Subjects } from "./models/Subjects.mjs";

configDotenv();
await connectDb();

const importData = async () => {
  try {
    const id = "66a3e08d95348810fa93fb2c";
    const all = classes(id);

    await Classes.insertMany(all);

    await Social_statuses.insertMany(social_statuses);
    await Sectors.insertMany(sectors);
    await Nationalities.insertMany(nationalities);
    await Military_services.insertMany(military_services);
    importSubjects();
    console.log(" Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const importSubjects = async () => {
  try {
    const idClassfor7 = await Classes.findOne({ name: "السابع" });
    const allSubjects7 = subjects(idClassfor7.id);
    await Subjects.insertMany(allSubjects7);
    const idClassfor8 = await Classes.findOne({ name: "الثامن" });
    const allSubjects8 = subjects(idClassfor8.id);
    await Subjects.insertMany(allSubjects8);
    const idClassfor9 = await Classes.findOne({ name: "التاسع" });
    const allSubjects9 = subjects(idClassfor9.id);
    await Subjects.insertMany(allSubjects9);
    const idClassfor10 = await Classes.findOne({ name: "العاشر" });
    const allSubjects10 = subjects(idClassfor10.id);
    await Subjects.insertMany(allSubjects10);
    const idClassfor11 = await Classes.findOne({ name: "الحادي عشر" });
    const allSubjects11 = subjects(idClassfor11.id);
    await Subjects.insertMany(allSubjects11);
    const idClassfor12 = await Classes.findOne({ name: "البكالوريا" });
    const allSubjects12 = subjects(idClassfor12.id);
    await Subjects.insertMany(allSubjects12);

    console.log(" Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    await Classes.deleteMany();

    await Social_statuses.deleteMany();
    await Sectors.deleteMany();
    await Nationalities.deleteMany();
    await Military_services.deleteMany();
    await Subject.deleteMany();
    console.log(" Removed!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// node seeder.mjs -import
if (process.argv[2] === "-importAll") {
  importData();
} else if (process.argv[2] === "-importSubject") {
  importSubjects();
} else if (process.argv[2] === "-remove") {
  removeData();
}

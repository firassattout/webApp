export const classes = (id) => {
  return [
    { name: "السابع", section: "الاولى", admin: id },
    { name: "الثامن", section: "الاولى", admin: id },
    { name: "التاسع", section: "الاولى", admin: id },
    { name: "العاشر", section: "الاولى", admin: id },
    { name: "الحادي عشر", section: "الاولى", admin: id },
    { name: "البكالوريا", section: "الاولى", admin: id },
    { name: "السابع", section: "الثانية", admin: id },
    { name: "الثامن", section: "الثانية", admin: id },
    { name: "التاسع", section: "الثانية", admin: id },
    { name: "العاشر", section: "الثانية", admin: id },
    { name: "الحادي عشر", section: "الثانية", admin: id },
    { name: "البكالوريا", section: "الثانية", admin: id },
    { name: "السابع", section: "الثالثة", admin: id },
    { name: "الثامن", section: "الثالثة", admin: id },
    { name: "التاسع", section: "الثالثة", admin: id },
    { name: "العاشر", section: "الثالثة", admin: id },
    { name: "الحادي عشر", section: "الثالثة", admin: id },
    { name: "البكالوريا", section: "الثالثة", admin: id },
  ];
};

export const military_services = [
  { name: "منتهي من الخدمة" },
  { name: "اخدم حاليا" },
  { name: "مؤجل" },
  { name: "معفى من الخدمة" },
];
export const nationalities = [
  { name: "سوريا" },
  { name: "فلسطين" },
  { name: "الأردن" },
  { name: "لبنان" },
  { name: "مصر" },
];
export const social_statuses = [
  { name: "اعزب" },
  { name: "متزوج" },
  { name: "مطلق" },
  { name: "ارمل" },
];
export const sectors = [
  { name: "ببيلا" },
  { name: "المهاجرين" },
  { name: "دمر" },
  { name: "المزة" },
  { name: "ضاحية قدسيا" },
];
export const subjects = (classes) => {
  return [
    { name: "رياضيات", class_id: classes },
    { name: "فيزياء", class_id: classes },
    { name: "كيمياء", class_id: classes },
    { name: "علوم", class_id: classes },
    { name: "عربي", class_id: classes },
    { name: "فقه", class_id: classes },
    { name: "عقيدة", class_id: classes },
    { name: "انكليزي", class_id: classes },
    { name: "تلاوة", class_id: classes },
    { name: "فرنسي", class_id: classes },
    { name: "سيرة", class_id: classes },
  ];
};

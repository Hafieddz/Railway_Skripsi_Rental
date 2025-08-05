const { v4: uuidv4 } = require("uuid");

const TOTAL_BOOKINGS = 50;

const auth_id = [
  "c5caf2ea-933f-4b85-824b-1dc7fdec3db2",
  "8f30dd27-35f2-42ba-9eef-ff98c9b6d113",
  "de87800c-93ab-401f-a834-ab5b5b471967",
  "f6b15089-a971-483a-8292-34e441f7eb30",
  "7308812d-30bb-439a-9706-082b118f5f4f",
  "22b6c246-0f6d-4d44-9bd6-5cace6c3510b",
  "2bcf0796-855b-4a87-a935-cf7a801c7522",
  "24aba926-01bc-4ee0-a720-f04236fce6e8",
  "9debd646-6de5-4793-a0fc-24126fae1f19",
  "0513985c-14d6-4e53-8504-ae6cf0f1a733",
];
const user_id = [
  "222acce0-b8c0-4e6c-8d2d-e5cd1c36f246",
  "2f453c20-c1b0-4029-abf8-ccc268f01206",
  "b755c312-66b3-4e32-903e-c179e39ab822",
  "2ebe8ee8-62b0-440e-a2af-7300a75f7274",
  "bb4f38ca-7cd9-4cf8-8be8-d4a5692e2047",
  "63ee39e2-9ba6-430a-8ee9-2c38d327a76b",
  "fd46c29e-7b22-4ee3-9add-980994660fa7",
  "faac40a9-57da-4c0b-8b17-92df316cd82c",
  "fd36838f-9268-406b-b06e-531bbb7119b2",
  "7853b1c7-50b1-4c1c-8bf3-f5e7821dcbe0",
];
const child_id = [
  "b28d5486-f32f-470c-8aa4-27add0d2f639",
  "765f7274-d1ee-4b50-aa1b-845443b64d06",
  "8a9b3b6d-b563-4d45-b9ff-8d98942a7d58",
  "b82c6c01-38ce-464b-b6e2-051a98616a06",
  "3e23fcb2-7c32-4a1d-965b-441f2ea79e85",
  "706a662b-f58a-4093-9ded-1bf7faf893d5",
  "d3450866-e63e-4043-9492-abbd0a67c07e",
  "006d8ca3-6904-440d-b7b8-857ea3afa6b7",
  "76f5f400-f483-4edb-b48b-948c149e11fe",
  "3270ea2e-4c60-40b5-8ab1-41f6e3e689f2",
];

export const dummy_customer_id = [
  "765f7274-d1ee-4b50-aa1b-845443b64d06",
  "8a9b3b6d-b563-4d45-b9ff-8d98942a7d58",
  "b82c6c01-38ce-464b-b6e2-051a98616a06",
  "3e23fcb2-7c32-4a1d-965b-441f2ea79e85",
  "706a662b-f58a-4093-9ded-1bf7faf893d5",
  "d3450866-e63e-4043-9492-abbd0a67c07e",
  "006d8ca3-6904-440d-b7b8-857ea3afa6b7",
  "76f5f400-f483-4edb-b48b-948c149e11fe",
];

export const dummy_vehicle_id = [
  "00788f53-5766-41af-9238-d00fd235f703",
  "00fdbbd4-91f6-48d4-9809-aa713bce6e44",
  "055ee1ef-b517-4810-bb56-1140d0eb49ea",
  "05fce81c-7603-45df-845b-9fc42a16b5c6",
  "172e309e-b9c7-4da1-8292-ae1af14c1a17",
  "2e44cfc7-fed4-47ba-929c-91144c5ed6cb",
  "535e25b0-9b38-471a-8cf2-de417228c251",
  "74ff9ae8-aa20-4c4f-a192-0867583ecd82",
  "89625172-09de-4725-8d96-a0124f1c5eb7",
  "8a395d2f-5483-4689-80f9-2743f156b341",
  "92755b5e-64bf-4954-bae7-db0057646542",
  "a59b59ac-8f61-4c2a-a466-4d696e93a4f4",
  "af4c9fd4-3d88-4be5-bcd6-644ad85d62a9",
  "d836c337-beb3-44af-bbb9-9550bdcd4287",
  "f45bc4c8-3cb6-425c-b46a-3d94fa314470",
  "f53de240-a17d-4412-948f-e5838af2473e",
  "fd65567f-ab4b-4242-8a65-405e1d5e4b6a",
];
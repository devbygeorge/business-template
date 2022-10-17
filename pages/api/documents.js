import createDocuments from "@/utils/createDocument";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Only POST method is allowed in this request" });
  }

  try {
    const documents = await createDocuments();
    res
      .status(200)
      .json({ message: "Documents created successfully", documents });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

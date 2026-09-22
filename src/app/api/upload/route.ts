import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const documentType = formData.get("documentType") as string || "Uploaded Document";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // Validate mime type (PDF, JPEG, JPG, PNG)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF, JPG, JPEG, and PNG files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      message: "File uploaded successfully",
      documentType,
      fileName: file.name,
      fileSize: file.size,
      fileUrl: base64Data, // Data URL stored cleanly
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

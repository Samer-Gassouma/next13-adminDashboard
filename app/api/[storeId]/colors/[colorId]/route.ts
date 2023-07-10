import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (err) {
    console.log("[color_GET] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (err) {
    console.log("[color_PATCH] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.colorId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (err) {
    console.log("[color_DELETE] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

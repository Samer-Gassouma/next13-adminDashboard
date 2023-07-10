import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true
      }
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log("[category_GET] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name , billboardId } = body;
    if (!billboardId) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("category ID is required", { status: 400 });
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name , billboardId
      },
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log("[category_PATCH] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.categoryId) {
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
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log("[category_DELETE] Error: ", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

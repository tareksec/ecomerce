import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderNumber,
      customerName,
      customerPhone,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
      notes,
      items,
    } = body;

    const order = await db.order.create({
      data: {
        number: orderNumber,
        customerName,
        customerPhone,
        shippingAddress,
        paymentMethod: paymentMethod || "COD",
        subtotal: subtotal || 0,
        shipping: shipping || 70,
        total: total || 0,
        notes: notes || "",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            totalPrice: item.unitPrice * item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

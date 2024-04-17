import { SignUpSchema } from "@/Types/allTypes.d";
import { error } from "console";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    const body = await req.json();
    console.log('body: ', body);
    let zodErrors = {}
    const result = SignUpSchema.safeParse(body)
    console.log('result: ', result);
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }
    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { success: true }
    )
}
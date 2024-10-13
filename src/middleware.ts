import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export function middleware(request: NextRequest) {
  console.log("Middleware running for path:", request.nextUrl.pathname);

  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("Access Token:", accessToken);

  // If there's no access token, redirect to login
  if (!accessToken) {
    console.log("No access token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
    const userRole = decodedToken.role;

    console.log("Decoded Token:", decodedToken);
    console.log("User Role:", userRole);

    // Check if it's the admin route
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        console.log("User is not admin, redirecting to unauthorized");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Check if it's the user route
    if (request.nextUrl.pathname.startsWith("/user")) {
      if (userRole !== "user" && userRole !== "admin") {
        console.log("User is not authorized, redirecting to unauthorized");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // If all checks pass, allow the request to proceed
    console.log("All checks passed, proceeding with request");
    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    // If there's an error decoding the token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};

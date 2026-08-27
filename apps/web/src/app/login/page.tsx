// @ts-nocheck
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <a href="/">
              <img
                src="https://ucarecdn.com/03d261bb-af6b-4183-a35c-afdbb7e1a2b7/-/format/auto/"
                alt="eatOS"
                className="h-10 w-auto"
              />
            </a>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Manage your entire business in one place.
          </h1>
          <p className="text-xl text-gray-400">
            Join restaurants and retailers growing with <strong>eatOS</strong>.
          </p>

          <div className="mt-12 text-sm text-gray-500">
            Trusted by restaurants across the US
          </div>
        </div>

        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <a href="/">
              <img
                src="https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/"
                alt="eatOS"
                className="h-10 w-auto"
              />
            </a>
          </div>

          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-black font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/book-demo"
              className="text-black font-bold hover:underline"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

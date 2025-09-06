"use client";
import { MessageSquare, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-white">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 p-4 text-center min-h-screen">
        <div className="animate-fadeIn space-y-4">
          <MessageSquare className="h-16 w-16 text-blue-500 mx-auto animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to ThinkTalk
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            The revolutionary app that will change the way you communicate.
            Seamless, secure, and in real-time.
          </p>
        </div>
        <div className="mt-8 animate-pulse">
          <Link
            href="/workspace"
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-10 py-3 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
                Why ThinkTalk?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the features that make our app the best choice for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center animate-slideInUp">
              <Zap className="h-8 w-8 text-blue-500 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Real-time</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Experience seamless communication with our real-time chat features.
              </p>
            </div>
            <div className="grid gap-1 text-center animate-slideInUp [animation-delay:0.2s]">
              <Shield className="h-8 w-8 text-blue-500 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Secure</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your conversations are end-to-end encrypted, ensuring your privacy.
              </p>
            </div>
            <div className="grid gap-1 text-center animate-slideInUp [animation-delay:0.4s]">
              <MessageSquare className="h-8 w-8 text-blue-500 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Chat Rooms</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create and join chat rooms to discuss with your friends and colleagues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Getting started with ThinkTalk is as easy as 1, 2, 3.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center animate-slideInUp">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl mx-auto">1</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-50">Create an Account</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Sign up for free and set up your profile.
              </p>
            </div>
            <div className="grid gap-1 text-center animate-slideInUp [animation-delay:0.2s]">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl mx-auto">2</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-50">Join a Conversation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create or join chat rooms and start talking.
              </p>
            </div>
            <div className="grid gap-1 text-center animate-slideInUp [animation-delay:0.4s]">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl mx-auto">3</div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-50">Start Thinking & Talking</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Enjoy seamless communication with everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
            Ready to Join?
          </h2>
          <p className="max-w-[600px] mx-auto mt-4 text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Sign up now and start your journey with ThinkTalk. It is free!
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-blue-500 px-10 py-3 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ThinkTalk. All rights reserved.</p>
      </footer>
    </div>
  );
}

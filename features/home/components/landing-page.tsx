"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Check,
  Star,
  Clock,
  DollarSign,
  Award,
  Target,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stats, testimonials, features, links } from "../constants";
import Link from "next/link";

export const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ModernHR
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
              >
                Reviews
              </a>
              <Button
                variant="outline"
                className="hover:scale-105 transform transition-all duration-200"
                asChild
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg animate-fade-in">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-slate-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="block text-slate-600 hover:text-blue-600 transition-colors"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="block text-slate-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-slate-600 hover:text-blue-600 transition-colors"
              >
                Reviews
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20  lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200 animate-scale-in border-0">
                🚀 Trusted by 10,000+ Companies Worldwide
              </Badge>
              <h1 className="text-4xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                  {" "}
                  Workforce{" "}
                </span>
                Management
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed">
                Power your entire HR operations with AI-driven insights, crypto
                payroll, global compliance, and seamless employee experiences.
                From startup to enterprise - we scale with you.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6"
                >
                  Start Free 30-Day Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch 3-Min Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Setup in under 10 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Cancel anytime, no questions
                </div>
              </div>
            </div>

            {/* Enhanced Dashboard Preview */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border transform hover:scale-105 transition-all duration-500">
                <div className="space-y-6">
                  {/* Live Metrics Header */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">
                          Live Dashboard
                        </p>
                        <p className="text-sm text-slate-600">
                          Real-time workforce insights
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-slate-800">2,847</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +23% this month
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-6 h-6 text-green-600" />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      </div>
                      <p className="font-semibold text-slate-800">Attendance</p>
                      <p className="text-2xl font-bold text-green-600">98.7%</p>
                      <p className="text-xs text-green-700">
                        ↗ +2.1% vs last week
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                      </div>
                      <p className="font-semibold text-slate-800">Payroll</p>
                      <p className="text-2xl font-bold text-purple-600">
                        $2.4M
                      </p>
                      <p className="text-xs text-purple-700">
                        Multi-currency ready
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <Award className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="font-semibold text-slate-800">
                        Performance
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        4.8/5.0
                      </p>
                      <p className="text-xs text-blue-700">
                        Employee satisfaction
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <Target className="w-6 h-6 text-orange-600 mb-2" />
                      <p className="font-semibold text-slate-800">Goals</p>
                      <p className="text-2xl font-bold text-orange-600">87%</p>
                      <p className="text-xs text-orange-700">
                        On track completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              ⚡ Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Everything your HR team needs,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                in one place
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From AI-powered recruitment to crypto payroll, we&apos;ve built
              the most comprehensive HR platform for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-8 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Loved by HR teams worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what industry leaders are saying about ModernHR
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="animate-fade-in hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your HR operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of forward-thinking companies who trust ModernHR to
            power their workforce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-200 text-sm">
            💳 No credit card required • ⚡ Setup in 10 minutes • 🛡️
            Enterprise-grade security
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                {links?.products?.map((link) => (
                  <li key={link.placeHolder}>
                    <Link
                      href={link.link}
                      className="hover:text-white transition-colors"
                    >
                      {link.placeHolder}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Solutions</h3>
              <ul className="space-y-2 text-slate-400">
                {links?.solutions?.map((link) => (
                  <li key={link?.placeHolder}>
                    <Link
                      href={link?.link}
                      className="hover:text-white transition-colors"
                    >
                      {link?.placeHolder}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                {links?.resources?.map((link) => (
                  <li key={link?.placeHolder}>
                    <Link
                      href={link?.link}
                      className="hover:text-white transition-colors"
                    >
                      {link?.placeHolder}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                {links?.company?.map((link) => (
                  <li key={link?.placeHolder}>
                    <Link
                      href={link?.link}
                      className="hover:text-white transition-colors"
                    >
                      {link?.placeHolder}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">ModernHR</span>
              </div>
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} ModernHR. All rights reserved.
                Built with ❤️ for modern teams.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

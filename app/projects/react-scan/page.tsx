'use client'

import { ArrowLeft, Github, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ReactScanPage() {
  return (
    <div className="space-y-12">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Link 
          href="/"
          className="text-white/40 hover:text-white/60 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl text-white/90 font-mono">React Scan</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
            <span>Started: March 2024</span>
            <span>•</span>
            <span className="text-emerald-400">Active Development</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Link 
          href="https://react-scan.com" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/60 hover:text-white/80 transition-colors"
        >
          <Globe size={16} />
          <span>Visit Website</span>
        </Link>
        <Link 
          href="https://github.com/react-scan/react-scan" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/60 hover:text-white/80 transition-colors"
        >
          <Github size={16} />
          <span>View Source</span>
        </Link>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10" style={{ viewTransitionName: 'project-image-react-scan' }}>
        <Image
          src="/react-scan.png"
          alt="React Scan Screenshot"
          fill
          className="object-cover transition-[filter] duration-300"
          style={{
            filter: 'grayscale(0) contrast(1) brightness(1)'
          }}
        />
      </div>

      {/* Project Content */}
      <div className="space-y-12 text-white/80 font-mono">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white/90">Introduction</h2>
          <p className="text-lg leading-relaxed">
            React Scan is a comprehensive performance analysis tool designed to help developers understand and optimize their React applications.
            Born from the challenges of debugging complex React applications, it provides real-time insights into component behavior and rendering patterns.
          </p>
        </section>

        {/* Problem & Solution */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white/90">The Problem</h2>
          <p className="leading-relaxed">
            As React applications grow in complexity, understanding performance bottlenecks becomes increasingly challenging. 
            Traditional debugging tools often fall short in providing detailed insights into component rendering behavior, 
            making it difficult to identify and resolve performance issues.
          </p>
          
          <h3 className="text-xl text-white/90 mt-8">The Solution</h3>
          <p className="leading-relaxed">
            React Scan provides a suite of tools that offer deep insights into React applications:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Real-time component render tracking</li>
            <li>Performance metrics visualization</li>
            <li>Component dependency mapping</li>
            <li>Render cascade analysis</li>
            <li>Integration with React DevTools</li>
          </ul>
        </section>

        {/* Development Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white/90">Development Timeline</h2>
          <div className="space-y-6">
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute left-0 w-2 h-2 bg-white/40 rounded-full -translate-x-[5px]" />
              <h3 className="text-white/90">March 2024</h3>
              <p className="mt-1">Project inception and initial prototype development</p>
            </div>
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute left-0 w-2 h-2 bg-white/40 rounded-full -translate-x-[5px]" />
              <h3 className="text-white/90">April 2024</h3>
              <p className="mt-1">Beta release with core features implemented</p>
            </div>
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute left-0 w-2 h-2 bg-emerald-400 rounded-full -translate-x-[5px]" />
              <h3 className="text-white/90">Current</h3>
              <p className="mt-1">Active development and community feedback integration</p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white/90">Technical Implementation</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl text-white/90 mb-4">Core Technologies</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>React + TypeScript</li>
                <li>Custom instrumentation engine</li>
                <li>Chrome DevTools Protocol</li>
                <li>WebSocket for real-time updates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl text-white/90 mb-4">Architecture Highlights</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Event-driven monitoring system</li>
                <li>Non-intrusive instrumentation</li>
                <li>Modular plugin architecture</li>
                <li>Real-time data processing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact & Future */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white/90">Impact & Future Development</h2>
          <p className="leading-relaxed">
            React Scan has already helped numerous development teams identify and resolve performance bottlenecks
            in their applications. Looking forward, we're focusing on:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Enhanced visualization capabilities</li>
            <li>Machine learning-powered optimization suggestions</li>
            <li>Expanded plugin ecosystem</li>
            <li>Improved integration with existing development workflows</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 
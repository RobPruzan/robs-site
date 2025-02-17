"use client";

import { ProjectMasonry } from "./components/ProjectMasonry";
import { FloatingGhost } from "./components/FloatingGhost";
import Link from "next/link";
import { Background } from "./components/Background";

export default function Home() {
  const projects = [
    {
      title: "React from Scratch",
      description: "Re-implementation of React",
      longDescription:
        "A complete re-implementation of React w/ custom architecture, and a blog post describing it in detail",
      contributions: (
        <div className="space-y-3">
          <p>
            I implemented the core functionality of React (rendering,
            reconciliation, hooks) without referencing React's implementation.
            The goal was to understand how the abstractions were implemented,
            and the motivations behind them.
          </p>
          <p>
            Linked above is a blog post going over my thought process when
            making this to share the intuitions I built.
          </p>
        </div>
      ),
      link: "/blog/react-from-scratch",
      size: "medium" as const,
      images: [
        "/memo-code.png",
        "/reconciliation.png",
        "/react.png",
        "/position.png",
      ],
    },
    {
      title: "React Scan",
      link: "https://github.com/aidenybai/react-scan",
      size: "medium" as const,
      description: "Visualize re-renders in your react app",
      longDescription:
        "A script that hacks into react-internals to provide visualizations of re-renders, a real time component inspector tool, and an always on component render time profiler",
      contributions: (
        <div className="space-y-3">
          <p>
            Built the component inspector tool. This tool allows you to select
            any component, view its props/state/context, and view in real time
            diffs of what props/state/context changed.
          </p>
          <p>
            Implemented the runtime to efficiently draw render outlines to the
            screen. This ended up requiring lots of hacks to have no overhead on
            user application, like asynchronously reading DOM layout,
            interpolating outlines to give the illusion of max FPS outline
            updates, and aggregation techniques so memory scales O(1) w.r.t
            outline.
          </p>
          <p>
            Implemented the notification system for react-scan to detect slow
            performance, and visualize what happened. The hardest part of this
            was developing a browser independent script to accurately collect
            data about the browser rendering pipeline, allowing react-scan to
            know precisely how long every frame spent on JavaScript, React
            renders, frame preparation, frame constructing, and frame drawing
            (compositing, rasterization).
          </p>
          <p>Implemented React Scan for React Native.</p>
        </div>
      ),
      images: [
        "/react-scan-v3.png",
        "/toolbar-expanded.png",
        "/notifications.png",
        "/monitoring.png",
      ],
    },
    {
      title: "Session Replay (for performance problems)",
      description:
        "Visually enhanced session replays, offline app simulations, session replay to mp4 server, replay search engine",
      longDescription:
        "A comprehensive system for detecting performance problems, collecting session replays, analyzing performance problems, and recommending the videos to users",
      contributions: (
        <div className="space-y-3 overflow-y-auto">
          <p>This system can be split up roughly into:</p>
          <div className="pl-6 text-xs flex flex-col gap-y-1">
            <div>• Runtime to detect performance problems</div>
            <div>
              • Runtime to collect session replays (a snapshot + event log of
              DOM changes) and React render data to visualize - it overlays onto
              the video the same render outlines React Scan uses
            </div>
            <div>
              • A puppeteer cluster to turn the DOM event log into mp4's (it was
              not scalable to replay the snapshot + mutations on user device)
            </div>
            <div>
              • A well designed frontend that recommends you session replays,
              taking inspiration from traditional media like YouTube/Crunchyroll
            </div>
          </div>

          <p>
            The end result is a script you throw in the background of your app.
            This script automatically collects videos of when your app is slow,
            and surfaces the videos in the frontend. The video player tells you
            what the root problem of the performance issue was, so you do not
            need to reproduce the problem to know the root problem.
          </p>
        </div>
      ),
      link: "https://github.com/aidenybai/react-scan/pull/200",
      size: "large" as const,
      images: [
        "/replay-2.png",
        "/replay-3.png",
        "/replay-1.png",
        "/replay-4.png",
      ],
    },
    {
      title: "AlgoViz",
      description:
        "A multiplayer graph builder, code executor, algorithm visualizer",
      longDescription:
        "A multiplayer graph builder, code executor, algorithm visualizer",
      contributions: (
        <div className="space-y-3">
          <p>
            AlgoViz implements a custom playground designed specifically for
            constructing graphs that you would see in an algorithms class (as
            the motivation was a tool for a DSA class).
          </p>
          <p>
            Next to the graph builder is a code editor, where you can implement
            algorithms. These algorithms are executed on a remote sandboxed
            server, and visualized directly on the graph built.
          </p>
          <p>
            You can step through each iteration of the algorithm to see how it
            traverses the graph.
          </p>
          <p>
            AlgoViz also implements a heap inspector that allows you to view the
            real time state of all your variables at every step of your
            algorithm.
          </p>
          <p>
            AlgoViz is entirely multiplayer (
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="underline"
              href="/blog/infinite-canvas"
            >
              blog post about implementing a multiplayer infinite canvas
            </Link>
            ). You can share playgrounds with other people, and the state of the
            whiteboard will be synced in real time with all other members.
          </p>
        </div>
      ),
      link: "https://algoviz.app",
      size: "large" as const,
      images: [
        "/algo-home.png",
        "/algo-good.png",
        "/editor.png",
        "/selection.png",
      ],
    },
    {
      title: "Fireside",
      description:
        "Real time question board with P2P audio, multiplayer canvas, on device audio transcription, LLM TA",
      longDescription:
        "Real time question board with P2P audio, multiplayer canvas, on device audio transcription, LLM TA",
      link: "https://github.com/RobPruzan/fireside",
      contributions: (
        <div className="space-y-3 text-xs">
          <p>
            Fireside is a culmination of technologies I wanted to learn deeply.
          </p>
          <p>
            Fireside implements P2P audio broadcasting through WebRTC. This
            implementation allows for m{"->"}n audio broadcasting, where hosts
            can broadcast audio to any number of participants.
          </p>
          <p>
            Transcription is performed on device through a WASM'd version of
            OpenAI Whisper. Since the transcription is collected locally, it's
            then broadcasted to users in realtime. This means both the audio
            broadcasting and transcription is near 0 overhead for the backend.
          </p>
          <p>
            The transcription recorded and user chat messages are sent to a
            Mistral model, where it autonomously creates threads in the app to
            answer user questions. The motivation is professors can't answer all
            questions students have during lectures, and most of the time the
            question was answered by something the professor just said.
          </p>
          <p>
            The app importantly implements a real time canvas that supports
            image upload, drawing, and embedding the canvas directly into chat
            messages. The specific motivation for the app was to allow
            professors to visualize drawings for students directly in the website. It also
            allows students to quickly send hand drawn diagrams when asking
            questions.
          </p>
          <p>
            And of course, real time chat messages, threads, reactions, friend
            requests and DMs.
          </p>
        </div>
      ),
      size: "large" as const,
      images: ["/frieren.png", "/diagram.png", "/cycles.png", "/emojis.png"],
    },
    {
      title: "Trace Tool",
      description:
        "An assessment platform for language agnostic memory diagrams",
      longDescription:
        "An educational tool for teaching and testing understanding of memory management and data structures.",
      project: "https://tracing.cse.buffalo.edu/student/tracing/practice",
      contributions: (
        <div className="space-y-3">
          <p>
            Trace tool is an application I built (along with{" "}
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="underline"
              href={"https://nico.engineer/"}
            >
              Zaid
            </Link>
            ) for my university (University at Buffalo). It's used by multiple
            courses and thousands of students to assess students' understanding
            of the underlying memory of programs during execution.
          </p>
          <p>
            This is one of my most proud projects I've worked on since it was
            the first time I owned an entire user experience end-to-end.
          </p>
          <p>
            The most important feature of the trace tool is a general editor for
            representing language agnostic memory layouts. We need to represent
            scopes, reclaiming memory, stack frames, heap objects, the
            relationship between variables, objects, and IO.
          </p>
          <p>
            The quiz platform itself is split up into 2 sections: Student (to
            take quizzes) and Instructor (manage quizzes).
          </p>
          <p>
            On the student side, the trace editor is applied to a quiz taking
            experience. This is surprisingly hard. You need to not add stress to
            an already stressful experience (taking a quiz). This means having
            support for things like undo/redo state, drag and drop support, and
            reliable (and optimistic) autosaves that can never get out of sync
            with server.
          </p>
          <p>
            Another large consideration is security. Students will try to cheat,
            try to access quizzes they shouldn't try to access, access quizzes
            at the wrong time, submit when they aren't finished, need to go back
            and edit the quiz, access other students' quizzes. There's an
            endless list of requirements which need to be validated on the
            client AND server for optimal UX. This complexity can only be
            contained with a composable and testable permissions system, which
            was implemented with tRPC middleware, SQLite (SQLite makes
            testing... fun), React Suspense + TanStack Suspense queries, and
            error boundaries. I need an entire writeup to explain the approach
            taken, but the correct technology choices were extremely important.
          </p>
          <p>
            The student implementation is only half the app. Instructors also
            need to create assessments, grade students, manage submissions,
            create solutions, receive automatically generated solutions and 100
            other things to meet requirements. This is a little more boring so I
            won't get into the details, but the same intuitions from the student
            side apply. A robust permission system is still crucial to avoid
            data leaks.
          </p>
          <p>
            We have a paper to-be-published describing the application's
            motivations and solutions.
          </p>
        </div>
      ),
      link: "https://tracing.cse.buffalo.edu/student/tracing/practice",
      size: "large" as const,
      images: ["/trace.png", "/grading.png", "/table.png", "/solution.png"],
    },
    {
      title: "Million Lint Profiler",
      link: "https://million.dev",
      size: "large" as const,
      description: "A real time React profiler directly in a VSCode extension",
      longDescription:
        "A React profiler and component tree that visualizes slow components directly inside a VSCode extension",
      project: "https://million.dev",
      contributions: (
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className="">
              This one was hard. I'll break up the feature into distinct parts:
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Babel Plugin</h3>
            <p>
              We have a Babel plugin that injects our profiling code into the
              user's React code. This allows us to get precise timings on
              component renders, hook calls, and render data. We can tie all
              this data back to source code trivially.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">JavaScript Runtime</h3>
            <p>
              We ship a JavaScript runtime that hooks into React internals to
              track the life cycle of component renders. This is also what
              allows us to generate visualizations of the fiber tree.
            </p>

            <p>
              All this data needs to be sent over the network to our extension.
              The fiber tree (React's runtime representation of components that
              have been rendered) can be massive, and updated extremely quickly.
              It's unfeasible to send the entire fiber tree every render, so I
              had to develop an efficient algorithm that syncs the runtime fiber
              tree to the fiber tree representation we had stored on the
              extension. This algorithm sends compressed fiber tree nodes as
              patches over a WebSocket connection.
            </p>

            <p>
              This algorithm must run in the hot path of user code when
              rendering, so it needed to have tight runtime complexity
              guarantees to avoid destroying performance on large applications
              (scale linear w.r.t size of fiber tree).
            </p>

            <p>
              The runtime to sync the fiber tree also needed to self heal if it
              got out of sync with server state.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Compiler server</h3>
            <p>
              Every time the user spins up a dev server, our build plugin spins
              up a TCP server next to the user's dev server. This makes
              WebSocket and HTTP connections with the JavaScript runtime. It
              acts as a proxy to the extension.
            </p>

            <p>
              The compiler server must handle M runtime connections from tabs
              open with the user website, and then connect to N extensions - as
              a user may have multiple projects open.
            </p>

            <p>
              To support real time profiling, we needed to implement
              synchronization primitives between the extension and the
              JavaScript runtime on the compiler server. There are lots of UX
              considerations, for example, should you accept profiling updates
              from a tab the user is not focused on?
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">VSCode webview</h3>
            <p>
              How are we able to render this pretty profiling view in VSCode?
              VSCode supports webviews, which means we can run any JavaScript
              that can run on the web to visualize data. One problem with
              webview is that we lack native APIs to access things like file
              system while in webview, since it's just an iframe. So we needed
              to implement an RPC layer between the iframe and native layer. The
              webview is just a normal React application, which listens to a
              store for updates. These updates are pushed by the native layer
              that receives updates from the compiler server.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">TLDR</h3>
            <p>
              We send React internal data over a WebSocket connection to a
              VSCode extension, which is just a React app :)
            </p>
          </div>
        </div>
      ),
      images: [
        "/profile-1.png",
        "/profile-4.png",
        "/profile-3.png",
        "/profile-2.png",
      ],
    },
  ];

  return (
    <>
      <Background />
      <div className="hidden md:block">
        <FloatingGhost />
      </div>
      <div className="min-h-screen w-full">
        <main className="px-4 md:px-6">
          <div className="max-w-[1400px] mx-auto">
            <ProjectMasonry projects={projects} />
          </div>
        </main>
      </div>
    </>
  );
}

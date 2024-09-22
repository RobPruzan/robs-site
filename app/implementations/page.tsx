"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, X } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const filteredThoughts = thoughts
    .map((thought) => ({
      text: JSON.stringify([thought.header, thought.meta, thought.text]),
      thought,
    }))
    .map(({ text, thought }) => ({ thought, text: text.toLowerCase().trim() }))

    .filter(({ text }) => text.includes(search));
  return (
    <div className="flex flex-col">
      <div>
        These notes act as a cache for intuitions that required some deep
        thought.
      </div>
      <div>
        Plan is to organize this as a somewhat unorganized searchable stream of
        thoughts to incentivize myself to write stuff down
      </div>
      <div>Making this public for fun</div>

      <h2>Start</h2>

      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {filteredThoughts.map(({ thought }, index) => (
        <div key={index}>
          <h4>{thought.header}</h4>

          <div>{thought.text}</div>
          <CollapsibleMetadata content={thought.meta} />
        </div>
      ))}
    </div>
  );
}

const CollapsibleMetadata = ({ content }: { content: string }) => {
  const [collapse, setCollapse] = useState(false);

  if (collapse) {
    return (
      <Button
        onClick={() => {
          setCollapse(false);
        }}
      >
        search metadata
      </Button>
    );
  }

  <div>
    <Button
      onClick={() => {
        setCollapse(true);
      }}
    >
      <X />
    </Button>

    {content}
  </div>;
};

type Thoughts = {
  text: string;
  header: string;
  meta: string;
};

const thoughts: Array<Thoughts> = [];

thoughts.push({
  header: "testing",
  meta: "",
  text: "",
});

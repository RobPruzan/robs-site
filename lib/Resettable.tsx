import { Button } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { Undo, Undo2 } from "lucide-react";
import React, { Component, ComponentType } from "react";

interface WithResetState {
  key: number;
}

function withReset<P extends object>(WrappedComponent: ComponentType<P>) {
  return class ResetHOC extends Component<P, WithResetState> {
    constructor(props: P) {
      super(props);
      this.state = {
        key: 0,
      };
      this.reset = this.reset.bind(this);
    }

    reset() {
      this.setState({ key: this.state.key + 1 });
    }

    render() {
      return (
        <div className="relative">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute top-0 w-fit h-fit"
            style={{
              left: -25,
              padding: "4px",
            }}
            onClick={this.reset}
          >
            <Undo2 size={15} />
          </Button>
          <WrappedComponent key={this.state.key} {...this.props} />
        </div>
      );
    }
  };
}

export default withReset;

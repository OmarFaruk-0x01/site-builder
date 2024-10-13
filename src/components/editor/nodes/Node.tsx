import { useEditor, useNode } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUp, Delete, Move } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const RenderNode = ({ render }: any) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom!);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      ?.querySelector(".craftjs-renderer")
      ?.addEventListener("scroll", scroll);

    return () => {
      document
        ?.querySelector(".craftjs-renderer")
        ?.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              // @ts-ignore
              ref={currentRef}
              className="px-2 py-2 text-white bg-primary fixed flex items-center h-[30px] mt-[-30px] text-[12px] leading-[12px] "
              style={{
                left: getPos(dom!).left,
                top: getPos(dom!).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                // @ts-ignore
                <button className="mr-2 cursor-move" ref={drag}>
                  <Move className="w-4 h-4" />
                </button>
              ) : null}
              {id !== ROOT_NODE && (
                <button
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent!);
                  }}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              )}
              {deletable ? (
                <button
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Delete className="w-4 h-4" />
                </button>
              ) : null}
            </div>,
            document.querySelector(".page-container")!
          )
        : null}
      {render}
    </>
  );
};

export default RenderNode;

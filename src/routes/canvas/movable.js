/** @param {HTMLElement} node */
export function movable(node) {
    let dragging = false;

    /** @param {DragEvent} e */
    function handleMouseDown(e) {
        dragging = true;
    }

    function handleMouseUp() {
        dragging = false;
    }

    function handleMove(e) {
        if (!dragging) {
            return;
        }

        const top = Number(node.style.top.slice(0, -2));
        node.style.top = `${top + e.movementY}px`;
        const left = Number(node.style.left.slice(0, -2));
        node.style.left = `${left + e.movementX}px`;
    }

    node.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    node.addEventListener('mousemove', handleMove);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            node.removeEventListener('mousemove', handleMove);
        }
    }
}

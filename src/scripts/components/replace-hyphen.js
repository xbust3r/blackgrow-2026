const replaceHyphens = {
    treeWalker: document.createTreeWalker(
        document.querySelector('main'),
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentElement;

                if (!parent) return NodeFilter.FILTER_REJECT;

                if (['SCRIPT', 'STYLE'].includes(parent.tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            },
        },
        false,
    ),
    searchAndReplace() {
        while (this.treeWalker.nextNode()) {
            this.treeWalker.currentNode.textContent = this.treeWalker.currentNode.textContent.replaceAll(/-|–/g, '‑');
        }
    },
};

replaceHyphens.searchAndReplace();
module Animate {

    export interface IReactTreeNodeProps {
        node: TreeNodeModel;
    }

	/**
	 * This visual representation of a TreeNodeModel
	 */
	export class ReactTreeNode extends React.Component<IReactTreeNodeProps, any> {

        private _dropProxy: any;

        /**
         * Creates an instance
         */
        constructor(props: IReactTreeNodeProps) {
            super(props);
        }

        /**
         * Creates the component elements
         * @returns {JSX.Element}
         */
        render(): JSX.Element {
            let node = this.props.node;

            return (
                <div
                    className={"treenode" +
                        (node.expanded() ? ' expanded' : ' collapsed')  +
                        (node.selectable() ? ' selectable' : '') +
                        (node.disabled() ? ' disabled' : '') +
                        (node.focussed ? ' focussed' : '') }>
                    <div className="node-header">
                        <div className="expand-button unselectable" style={{visibility: ( this.props.node.children.length == 0 ? 'hidden' : '' )}}>
                            {( node.expanded() ?
                                <span onClick={(e) => {
                                    if (node.disabled())
                                        return;

                                    node.expanded(false);
                                }}>-</span> :
                                <span onClick={(e) => {
                                    if (node.disabled())
                                        return;

                                    node.expanded(true);
                                }}>+</span>
                            )}
                        </div>
                        <div draggable={node.canDrag}
                            onDragStart={ (e) => {
                                let json = node.onDragStart(e);
                                if (json)
                                    e.dataTransfer.setData('text', JSON.stringify(json) );

                            }}
                            onDragOver={ (node.canDrop ? (e) => { e.preventDefault(); } : null )}
                            onDrop={(node.canDrop ? (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                    let json : IDragDropToken;
                                    let data = e.dataTransfer.getData('text');
                                    if (data && data != '')
                                        json = JSON.parse(data);

                                    node.onDragDrop(e, json);
                                }
                                catch(e) {
                                }

                            } : null )}
                            className={"label unselectable" + (node.selected() ? ' selected' : '')}
                            onContextMenu={(e) => {
                                if (node.disabled())
                                    return;

                                if (node.selectable())
                                    node.store.onNodeSelected(node, node.selected() ? true : false, false );
                                else
                                    node.store.onNodeSelected(null, false);

                                 node.onContext(e);
                            }}
                            onClick={(e) => {
                                if (node.disabled())
                                    return;

                                if (node.selectable()) {
                                    node.store.onNodeSelected(node, e.shiftKey);
                                }
                            }}>
                            {node.icon()}
                            {node.label()}
                        </div>
                    </div>
                    <div className="child-nodes">
                        {this.props.node.children && this.props.node.children.map(function(n, index) {
                            return <ReactTreeNode key={'node-' + index} node={n} />
                        })}
                    </div>
                </div>
            )
        }
    }
}
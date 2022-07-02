import { JSONEditor } from 'svelte-jsoneditor/dist/jsoneditor.js';
import { useEffect, useRef } from 'react';
import { TempAny } from '../inspector-service';
import './JSONEditor.css';

export default function SvelteJSONEditor(props: {content: TempAny, onChange: TempAny}) {
  const refContainer = useRef(null);
  const refEditor = useRef<TempAny>(null);

  useEffect(() => {
    // create editor
    console.log('create editor', refContainer.current);
    refEditor.current = new (JSONEditor as TempAny)({
      target: refContainer.current,
      props: {},
    });

    // (document.querySelector('.jse-menu') as any).style.backgroundColor = '#999';

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      const defaultProps = {
        navigationBar: false,
      }
      refEditor.current.updateProps({ ...defaultProps, ...props });
    }
  }, [props]);

  return <div className="json-editor" ref={refContainer} />;
}

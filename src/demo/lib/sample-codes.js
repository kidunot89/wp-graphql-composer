export const attachment = `
  //Custom Attachment View Component
  const view = props => props.src ? (<img {...props} />) : null;
  
  const Attachment = attachment.compose(view);

  const App = () => (
    <Attachment src="https://source.unsplash.com/480x320" />
  );

  render(
    <Provider>
      <App />
    </Provider>
  );

`;

export const footer = `

`;

export const header = `

`;

export const login = `

`;

export const menu = `

`;
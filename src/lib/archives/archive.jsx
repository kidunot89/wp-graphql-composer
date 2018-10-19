import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const archive = ({
  Attachment,
  PostResult,
  container,
  containerProps,
  header,
  noHeader,
  resultsData,
  ...rest
}) => {
  const Results = () => (
    <React.Fragment>
      { !noHeader && (
        <header className="page-header">
          <h1 className="page-title">{header}</h1>
        </header>
      )}
      {map(resultsData, ({ id, ...r}) => (
        <PostResult {...r} id={id} key={id} {...{ ...rest, Attachment }} />
      ))}
    </React.Fragment>
  );

  if (container === true) {
    return (
      <div {...containerProps }>
        <Results />
      </div>
    )
  } else if ( container ) {
    const Container = container;

    return (
      <Container {...containerProps }>
        <Results />
      </Container>
    );
  }

  return (<Results />);
};

archive.propTypes = {
  Attachment: PropTypes.func.isRequired,
  PostResult: PropTypes.func.isRequired,
  container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
  containerProps: PropTypes.shape({}),
  noHeader: PropTypes.bool,
  header: PropTypes.string,
  resultsData: PropTypes.arrayOf(PropTypes.shape({})),
}

archive.defaultProps = {
  container: undefined,
  containerProps: {},
  noHeader: false,
  header: undefined,
  resultsData: [],
}

export default archive;

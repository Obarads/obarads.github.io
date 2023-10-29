import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const ContentWrapper = styled('div')({
  margin: '20px 16px',
});
const PaperWrapper = styled(Paper)({
  maxWidth: 936,
  margin: 'auto',
  overflow: 'hidden',
});

function Content(props) {
  let use_wrapper = props.use_wrapper;
  if(use_wrapper === undefined){use_wrapper = true;}

  if (use_wrapper) {
    return (
      <PaperWrapper>
        <ContentWrapper>
          {props.contents}
        </ContentWrapper>
      </PaperWrapper>
    );
  } else {
    return (
      <PaperWrapper>
        {props.contents}
      </PaperWrapper>
    );
  }
}

export default Content;

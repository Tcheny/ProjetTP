import React from 'react';
import styled from 'styled-components';

const Post = () => {
  return (
    <form>
      <div className="form-group">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  placeholder="Ralez plus fort que jamais!"></textarea>
      </div>
      <div className="form-group">
        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
      </div>
    </form>
  )
};

export default Post;
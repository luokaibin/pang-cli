import React from 'react';
import Home from './home'

export default function Index (props) {
  return (
    <Home locale={props.locale} index={props.index}/>
  )
}

// export const getServerSideProps = async (ctx) => {
//   // console.log('line 89', ctx.req);
//   return {props: {}}
// }

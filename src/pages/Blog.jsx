import React from "react";
import { Container, Row } from 'react-bootstrap';
import blogs from '../data/blogs';
import BlogCard from '../components/organisms/BlogCard';


function Blogs() {
 return (
   <Container className="my-5">
     <h1>Blogs</h1>
     <Row>
       {blogs.map((blog) => (
         <BlogCard key={blog.id} blog={blog} />
       ))}
     </Row>
   </Container>
 );
}


export default Blogs;

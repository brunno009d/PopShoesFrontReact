import React from "react";
import { Container, Row } from 'react-bootstrap';
import blogs from '../data/blogs';
import BlogCard from '../components/organisms/BlogCard';
import Texto from '../components/atoms/Texto';

function Blogs() {
 return (
   <Container className="my-5">
     <Texto variant="h1">Blog de Calzado, sugerencias y tendencias.</Texto>
     <Row>
       {blogs.map((blog) => (
         <BlogCard key={blog.id} blog={blog} />
       ))}
     </Row>
   </Container>
 );
}


export default Blogs;

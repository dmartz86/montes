import {connect} from 'mongoose';
import {Person, Post} from './models';
const log = console.log;

async function bloggin() {
  await connect('mongodb://localhost/blog');
  const daniel = await new Person({name: 'Daniel'}).save();
  const intro = await new Post({title: 'This is my new Blog', author: daniel._id}).save();
  const infor = await new Post({title: 'A funny entry', author: daniel._id}).save();
  daniel.posts.push(intro._id);
  daniel.posts.push(infor._id);
  daniel.name = 'MoNoTy';
  await daniel.save();
  const results = await Person.findOne({_id: daniel._id}).populate('posts');
  log(results);
  return 'done';
}

bloggin().then(log).catch(log);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{
  renderField(field){
    const { meta: { touched, error} } = field;
    //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': '' }`
    const className = `form-group ${touched && error ? 'has-danger': '' }`
    return(
      <div className = {className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {/*field.meta.touched ? field.meta.error : '' */}
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    //this === component
    //console.log(values);
    this.props.createPost(values, () =>{
      this.props.history.push('/');
    });
  }

  render(){
    const {handleSubmit} = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label = "Title Fot Post"
          name = "title"//connect with the error.title
          component = {this.renderField}
        />
        <Field
          label = "Categories"
          name = "categories"
          component = {this.renderField}
        />
        <Field
          label = "Post Content"
          name = "content"
          component = {this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to ="/" className = "btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.title || values.title.length <3){
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if(!values.categories){
    errors.categories = "Enter some categories!";
  }
  if(!values.content){
    errors.content = "Enter some content!";
  }

  //If errors is empty, the form is fine to submit
  //If errors has any properties, redux-form assumes form is invalid
  return errors;
}

//This is our redux-form helper that is going to allow redux-form to communicate directly
//from the component to the reducer that we already set up.
export default reduxForm({
  //validate: validate,//key and value are identical
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);

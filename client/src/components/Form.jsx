function Form(props) {
    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.submit(event);
    };

    return (
        <form onSubmit={handleOnSubmit} encType={props.encType}>
            {props.children}
        </form>
    );
}

export default Form;

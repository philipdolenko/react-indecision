class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.pickOne = this.pickOne.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }
    componentDidMount(){
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if(options) {
                this.setState(() => ({ options }))
            }
        } catch(e){

        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    handleDeleteOptions(){
        this.setState(() => ({ options: [] }))
    }

    pickOne(){
        const randNum = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[randNum])
    }

    handleDeleteOption(targOption){
        this.setState((prevState) => ({
         options: prevState.options.filter((option) => option !== targOption)
        }))
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option)> -1){
            return 'This option already exist'
        }

        this.setState((prevState) => ({
             options: prevState.options.concat(option) 
            }))
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
             <Header subtitle={subtitle}/>
             <Action
              hasOptions={this.state.options.length > 0}
              pickOne={this.pickOne}
              />
             <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              />
             <AddOption
             handleAddOption={this.handleAddOption}
             />
            </div>
        );
    }
}

const Header = (props) => (
    <div>
     <h1>{props.title}</h1>
     {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
)

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => (
    <div>
      <button onClick={props.pickOne}
      disabled={!props.hasOptions}
      >
      What shoud I don?
      </button>
    </div>
)

const Option = (props) => (
    <div>
    {props.option}
    <button
      onClick={(e) => {
       props.handleDeleteOption(props.option)
      }}
    >
      remove
    </button>
    </div>
)

const Options = (props) =>(
    <div>
     <button onClick={props.handleDeleteOptions}>Remove All</button>
     {props.options.length === 0 && <p>Please add an option to get started!</p>}
     {
        props.options.map((option) => 
        <Option
          key = {option}
          option={option}
          handleDeleteOption={props.handleDeleteOption}
        />)
     }
    </div>
)


class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption (e) {
        e.preventDefault()
        
        const option = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(option)
        
        this.setState(()=>({ error }))

        if(!error) {
            e.target.elements.option.value = ''
        }
    }
    
    render(){
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
             <form onSubmit={this.handleAddOption}>
              <input type="text"  name="option"></input>
              <button>Submit</button>
             </form>
            </div>
        )
    }
}

// const User = (props) => {
//     return (
//         <div>
//          <p>Name: {props.name}</p>
//          <p>Age: {props.age}</p>
//         </div>
//     )
// }

ReactDOM.render(<IndecisionApp />,document.getElementById('app'))
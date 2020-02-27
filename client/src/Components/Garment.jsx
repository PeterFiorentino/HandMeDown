
import React, { Component } from 'react'
import axios from 'axios'

 class Garment extends Component {
    state = {
        user: this.props.user,
        garment: {},
        historyPosts: []
    }

    componentDidMount = () => {
        this.getGarment()
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    getGarment = async () => {
        const { routeprops: { match:{ params } } } = this.props;
        const URL = `https://handmedown.herokuapp.com/garments/${params.id}`
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                garment: results.data.payload[0]
            })
        } catch (err) {
            console.log(err)
        }
    }

    getHistory = async () => {
        const { routeprops: { match:{ params } } } = this.props;
        const URL = `https://handmedown.herokuapp.com/histories/api/garment/${params.id}`
        try {
            let results = await axios.get(URL)
            console.log(results.data.payload)
            this.setState({
                history: results.data.payload
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { show, historyPosts } = this.state
        let historyComponents = []
        historyPosts.forEach(post => {
            historyComponents.push(
                <div>

                </div>
            )
        })
        return (
            <div className='main'>
                <div className='history-container'>
                    {historyPosts}
                </div>
            </div>
        )
    }
}

export default Garment
import React, { Component } from 'react'

 class Garment extends Component {
    state = {
        user: this.props.user,
        garment: {},
        historyPosts: []
    }

    componentDidMount = () => {

    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    getGarment = async () => {
        const { routeprops: { match:{ params } } } = this.props;
        const URL = ``
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
        const URL = ``
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

        historyPosts.forEach(post => {})
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
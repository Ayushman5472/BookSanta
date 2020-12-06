import React from 'react'
import LottieView from 'lottie-react-native'
export default class Santa extends React.Component{
    render(){
        return(
            <LottieView source = {require('../assets/39656-running-santa.json')} style = {{width:"60%"}} autoPlay loop></LottieView>
        )
    }
}
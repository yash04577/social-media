import React, { useContext, useState } from 'react'
import Context from './Context'

const State = (props) => {

    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState({});
    const [reloadTimeline, setReloadTimeline] = useState(false);
    const [showProfileModel, setShowProfileModel] = useState(false);
    const [posts, setPosts] = useState([]);

  return (
    <Context.Provider value={{showLogin, setShowLogin, user, setUser, reloadTimeline, setReloadTimeline,showProfileModel, setShowProfileModel, posts, setPosts}}>
        {props.children}
    </Context.Provider>
  )
}

export default State
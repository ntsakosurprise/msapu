


export const init = function(){
  
  
    console.log('React View has been initialised')
	this.listens({
		
		'handle-react-view': this.handleReactView.bind(this),
		'create-jwt-token': this.handleCreateToken.bind(this),
		'verify-jwt-token': this.handleVerifyToken.bind(this)
		
	})
	
	
	
}


export const handleReactView = function(data){

 
	const self = this 
	self.callback = data.callback

	self.runReactView(data)

	// self.currentReactView = data
	// self.log("Saving Jwt Key") 
	// self.key = data.key


} 


export const runReactView  = function(data){

 
	const self = this 
	const store = self.store 
	const {view} = data 
	const {StaticRouter} = self


	// Render the component to a string
	const html = self.renderToString(

		<StaticRouter location={view.url} context={context}>

			<Provider store={store}>
				<App />
		    </Provider>

		</StaticRouter>
		

	)


	// Grab the initial state from our Redux store
	const finalState = store.getState() 
	const fullPage = self.renderFullPage(html,finalState,view) 
	return self.callback(null,fullPage)
	
	


} 


export const renderFullPage = function(html, preloadedState,view,scripts) {

 
	return `
		<!doctype html>
		<html>
		<head>
			<title>${view.title}</title>
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
			// WARNING: See the following for security issues around embedding JSON in HTML:
			// https://redux.js.org/recipes/server-rendering/#security-considerations
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
				/</g,
				'\\u003c'
			)}
			</script>
			${scripts.map((item,index)=> `<script key=${index} src=${item} />`)}
			// <script src="/static/bundle.js"></script>
		</body>
		</html>
    `
	
	

} 














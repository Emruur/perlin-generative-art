let center, direction
let r
let variation
let x_start= 0


function setup() {
	background(0)
	createCanvas(windowWidth, windowHeight);
	center= createVector(width/2, height/2)

	r= Math.min(height,width)/3
	variation= r*2

	direction= createVector(r,0)

	
}

let inc
let prev
let p
let xoff
let rotation_speed
let polygon
let density
function draw() {
	background(0,15)

	//starting location for perlin noise
	xoff= x_start

	//UI inputs
	polygon= parseFloat(polyValue) // 2.2 nice
	rotation_speed= parseFloat(rotationValue)
	inc= parseFloat(incrementValue)
	density= parseFloat(densityValue)

	//Initial calculations for initializing prev vector
	let scaleVector= direction.copy()
	let mag= map(noise(xoff),0,1,r-variation,r+variation)
	scaleVector.setMag(mag)
	prev= center.copy().add(scaleVector)
	xoff += inc 

	for(let i= 0;i <= density*PI; i+= polygon){
		scaleVector= direction.copy().rotate(i)
		mag= map(noise(xoff),0,1,r-variation,r+variation)

		// stroke(0,255-mag,mag*15,255-mag/1.3)
		// strokeWeight(map(noise(xoff),0,1,10,0.5))

		// stroke(255-mag,255-mag/10,150-mag/5,255-mag/1.3)
		// strokeWeight(map(noise(xoff),0,1,8,0.5))

		stroke(map(noise(xoff),0,1,0,255),map(noise(xoff+1000),0,1,0,255),map(noise(xoff+2000),0,1,0,255),255-mag/1.6)
		strokeWeight(map(noise(xoff),0,1,10,0.5))

		scaleVector.setMag(mag)
		p= center.copy().add(scaleVector)

		line(prev.x,prev.y, p.x, p.y)

		prev= p
		xoff += inc
	}
	x_start+= rotation_speed

}

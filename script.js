function gRB() {if (Math.floor(Math.random() * 4) === 0) {return true;}}

function G(ctx, cS){
  			this.st = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
			this.ctx = ctx;
  			this.cS = cS;
  			this.color = "#CCCCCC";
			this.clks = 0;
		}

G.prototype.gClk = function() {return this.clks;};

G.prototype.cV = function(x, y) {
  					this.ctx.fillStyle = "#CCCCCC";
  					this.ctx.fillRect(x + 1,y + 1,this.cS - 2,this.cS - 2);
				};

G.prototype.nV = function() {
  	
				this.ctx.fillStyle = "#000";  
				this.ctx.textAlign = "center";
			  	this.ctx.font = "bold " + (this.cS/2) + "px Sans";
				this.ctx.textBaseline = "middle";
};

G.prototype.d = function() {
  				for (let i = 0; i < 4; i++) 
				{
    					for (let j = 0; j < 4; j++) 
					{
      						if (this.st[i][j] > 0) 
						{
        						this.cV(j * this.cS,i * this.cS);
        						this.nV();
        						this.ctx.fillText(this.st[i][j],j * this.cS + this.cS / 2,i * this.cS + this.cS / 2);
      						}
    					}
  				}
			};

G.prototype.gNC = function(){
  				for (let i = 0; i<4; i++)
				{
    					for (let j=0; j<4; j++)
					{
      						if(this.st[j][i] === 0)
						{
        						return {x: i, y: j};
      						}
    					}
  				}
			};

G.prototype.m = function(x, y) {
 				 let nC = this.gNC();
  				 let cMV = (x - 1 == nC.x || x + 1 == nC.x) && y == nC.y;
 				 let cMH = (y - 1 == nC.y || y + 1 == nC.y) && x == nC.x;

  					if (cMV || cMH) 
					{
    						this.st[nC.y][nC.x] = this.st[y][x];
    						this.st[y][x] = 0;
    						this.clks++;
  					}
				};
  
G.prototype.v = function() {
  				let comb = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
  				let res = true;
  				for (let i = 0; i < 4; i++) 
				{
    					for (let j = 0; j < 4; j++) 
					{
     						if (comb[i][j] != this.st[i][j]) 
						{
        						res = false;
        						break;
      						}
    					}
 				 }
 				 return res;
			};

G.prototype.xim = function(count) {
  					let x, y;
  					for (let i = 0; i < count; i++) 
					{
    						let nC = this.gNC();
    						let verM = gRB();
    						let upL = gRB();

    						if (verM) 
						{
      							x = nC.x; 
      							if (upL) {y = nC.y - 1;} 
							else{y = nC.y + 1;}
    						} 
						else
						{	
							y = nC.y; 
							if (upL){x = nC.x - 1;} 
							else {x = nC.x + 1;}
    						}

    					if (0 <= x && x <= 3 && 0 <= y && y <= 3) {this.m(x, y);}
  					}

  					this.clks = 0;
					};

window.onload = function(){
  				let canvas = document.getElementById("canvas");
  				canvas.width  = 400;
  				canvas.height = 400;
				let ctx = canvas.getContext("2d");
  				ctx.fillRect(0, 0, canvas.width, canvas.height);
				let cS = canvas.width / 4;
				let g = new G(ctx, cS);
  				g.xim(300);
  				g.d();

canvas.onclick = function(e) {
    					let x = (e.pageX - canvas.offsetLeft) / cS | 0;
    					let y = (e.pageY - canvas.offsetTop)  / cS | 0;
    					oE(x, y); 
  				};

canvas.ontouchend = function(e) {
    					let x = (e.touches[0].pageX - canvas.offsetLeft) / cS | 0;
    					let y = (e.touches[0].pageY - canvas.offsetTop)  / cS | 0;
   				 	oE(x, y);
  				};  

  function oE(x, y) { 
    			g.m(x, y);
    			ctx.fillRect(0, 0, canvas.width, canvas.height);
    			g.d();
    			if (g.v())
			 {
      				alert("Collected for "+g.gClk()+" touch!"); 
      				g.xim(300);
      				ctx.fillRect(0, 0, canvas.width, canvas.height);
      				g.d(ctx, cS);
    			}
  		}
		}
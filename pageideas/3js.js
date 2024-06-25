//mathematics for 3d graphics

var vec3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.getLen = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    this.getNormal = function() {
        const l = this.getLen();
        return new vec3(this.x / l, this.y / l, this.z / l);
    }
}

function gp(i,j) {
    return j*4+i;
}

vec3.prototype.dotProd = function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

vec3.prototype.add = function(a, b) {
    return new vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}

vec3.prototype.sub = function(a, b) {
    return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}

vec3.prototype.scale = function(a, s) {
    return new vec3(a.x * s, a.y * s, a.z * s);
}
//<yz-zy,zx-xz,xy-yx>
vec3.prototype.crossProd = function(a, b) {
    return new vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

var mat4 = function(dat) {
    if (typeof dat == 'object')
        this.m = dat;
    else {
        this.m = [];
        while (this.m.length < 16)
            this.m[this.m.length] = 0;
    }
    this.modify = function(i,j,v) {
        this.m[i+j*4]=v;
    }
}

mat4.prototype.makeIndentity = function() {
    var m = new mat4();

    m.modify(0,0,  1);
    m.modify(1,1,  1);
    m.modify(2,2,  1);
    m.modify(3,3,  1);

    return m;
}

mat4.prototype.createTranslation = function(pos) {
    if (typeof pos != typeof vec3)
        return null;

    var m = this.makeIndentity();

    m.modify(0,3,  -pos.x);
    m.modify(1,3,  -pos.y);
    m.modify(2,3,  -pos.z);

    return m;
}

mat4.prototype.createProjectionPerspective = function(fov, screenW, screenH, far, near) {
    const fRad = fov * 180 / Math.PI, S = 1 / Math.tan(fRad / 2), a = screenH / screenW;

    var m = new mat4();

    m.modify(0,0, S * a);
    m.modify(1,1, S);
    m.modify(2,2, (far / (far - near)));
    m.modify(2,3, -((far * near) / (far - near)));
    m.modify(3,2, -1);

    return m;
}

mat4.prototype.createProjectionOrtho = function() {
    //todo ortho projection
}

mat4.prototype.createRotationMatrixX = function(theta) {
    var m = mat4.makeIndentity();

    const cos = Math.cos(theta), sin = Math.sin(theta);

    m.modify(0,0, 1);
    m.modify(1,1, cos);
    m.modify(1,2, sin);
    m.modify(2,1, -sin);
    m.modify(2,2, cos);

    return m;
}

mat4.prototype.createRotationMatrixY = function(theta) {
    var m = mat4.makeIndentity();

    const cos = Math.cos(theta), sin = Math.sin(theta);

    m.modify(0,0, cos);
    m.modify(1,1, 1);
    m.modify(2,0, sin);
    m.modify(0,2, -sin);
    m.modify(2,2, cos);

    return m;
}

mat4.prototype.createRotationMatrixZ = function(theta) {
    var m = mat4.makeIndentity();

    const cos = Math.cos(theta), sin = Math.sin(theta);

    m.modify(0,0, cos);
    m.modify(0,1, sin);
    m.modify(1,1, cos);
    m.modify(1,0, -sin);

    return m;
}

mat4.prototype.createRotationMatrix = function(thetaX, thetaY, thetaZ) {
    var m = mat4.makeIndentity();

    const cosX = Math.cos(thetaX), cosY = Math.cos(thetaY), cosZ = Math.cos(thetaZ),
          sinX = Math.sin(thetaX), sinY = Math.sin(thetaY), sinZ = Math.sin(thetaZ);

    m.modify(0,0, cosY * cosZ);
    m.modify(1,0, sinX * sinY * cosZ - cosX * sinZ);
    m.modify(2,0, cosX * sinY * cosZ + sinX * sinZ);
    m.modify(0,1, cosY * sinZ);
    m.modify(1,1, sinX * sinY * sinZ + cosX * cosZ);
    m.modify(2,1, cosX * sinY * sinZ - sinX * cosZ);
    m.modify(0,2, -sinY);
    m.modify(1,2, sinX * cosY);
    m.modify(2,2, cosX * cosY);

    return m;
}
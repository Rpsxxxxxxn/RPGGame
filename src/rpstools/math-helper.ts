export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(value: Vector2) {
        this.x += value.x;
        this.y += value.y;
    }

    subtract(value: Vector2) {
        this.x -= value.x;
        this.y -= value.y;
    }

    multiply(value: Vector2) {
        this.x *= value.x;
        this.y *= value.y;
    }

    divide(value: Vector2) {
        this.x /= value.x;
        this.y /= value.y;
    }

    squareMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    magnitude() {
        return Math.sqrt(this.squareMagnitude());
    }

    normalize() {
        let magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    normalized(x: number, y: number) {
        let result = new Vector2(x, y);
        result.normalize();
        return result;
    }

    distance(value: Vector2) {
        let tx = value.x - this.x;
        let ty = value.y - this.y;
        return Math.sqrt(tx * tx + ty * ty);
    }

    equals(value: Vector2) {
        return (this.x == value.x && this.y == value.y);
    }


    dot(value: Vector2) {
        return this.x * value.x + this.y * value.y;
    }

    clamp(min: number, max: number) {
        this.x = Math.max(Math.min(this.x, max), min);
        this.y = Math.max(Math.min(this.y, max), min);
    }

    clear() {
        this.x = this.y = 0;
    }

    static lerp(a: Vector2, b: Vector2, t: number) {
        return new Vector2(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t)
    }
    
    static clone(value: Vector2) {
        return new Vector2(value.x, value.y);
    }

    static subtract(a: Vector2, b: Vector2) {
        let result = Vector2.clone(a).subtract(b);
        return result;
    }

    static Zero() {
        return new Vector2(0, 0);
    }

    static One() {
        return new Vector2(1, 1);
    }

    static Up() {
        return new Vector2(0, 1);
    }
    
    static Down() {
        return new Vector2(0, -1);
    }
    
    static Left() {
        return new Vector2(-1, 0);
    }
    
    static Right() {
        return new Vector2(1, 0);
    }
}

export class MathHelper {
}
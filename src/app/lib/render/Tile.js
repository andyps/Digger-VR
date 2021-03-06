const FACE_TILE_REPLICATION = [
    [0,1,1],
    [1,0,1],
    [1,1,0],
    [0,1,1],
    [1,0,1],
    [1,1,0]
];
const FACE_TILE_ADDITION = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [1,0,0],
    [0,1,0],
    [0,0,1]
];

const FACE2SIDE = [1,2,1,1,0,1];
const TILES = ['empty','dirt','grass','stone','impenetrable', 'sand'];
const TILE_TEX_RENDER = [
    [0,0,0],
    [1,1,1],
    [3,2,1],
    [4,4,4],
    [5,5,5],
    [6,6,6]
];
let fcnt = 0;
export default class Tile {
    static addFace(x,y,z,size,face,type,buffer) {
        for (let sx = 0; sx < Math.max(1,size * FACE_TILE_REPLICATION[face][0]); sx++) {
            for (let sy = 0; sy < Math.max(1,size * FACE_TILE_REPLICATION[face][1]); sy++) {
                for (let sz = 0; sz < Math.max(1,size * FACE_TILE_REPLICATION[face][2]); sz++) {
                    fcnt += 5;

                    let fx = x + sx + FACE_TILE_ADDITION[face][0]*(size-1);
                    let fy = y + sy + FACE_TILE_ADDITION[face][1]*(size-1);
                    let fz = z + sz + FACE_TILE_ADDITION[face][2]*(size-1);

                    buffer.push(fx % 128);
                    buffer.push(fy % 128);
                    buffer.push(fz % 128);
                    buffer.push(
                        Math.floor(fx / 128) +
                        (Math.floor(fy / 128) * 8) +
                        ((face % 2) * 64)
                    );
                    buffer.push(
                        Math.floor(fz / 128) +
                        (Math.floor(face / 2)*16)
                    );
                    buffer.push(
                        (type - 1)
                    );
                }
            }
        }
    }

    static getSide(face){
        return FACE2SIDE[face];
    }

    static getTileName(index){
        return TILES[index];
    }
    static getTileIndex(name){
        return TILES.indexOf(name);
    }

    static getTileTexForSide(ind,side){
        return TILE_TEX_RENDER[ind][TILE_TEX_RENDER[ind].length>side?side:0];
    }
    static getTileTexTop(ind){
        return TILE_TEX_RENDER[ind][0];
    }
    static getTileTexEdge(ind){
        return TILE_TEX_RENDER[ind][TILE_TEX_RENDER[ind].length>1?1:0];
    }
    static getTileTexBottom(ind){
        return TILE_TEX_RENDER[ind][TILE_TEX_RENDER[ind].length>2?2:0];
    }

    static getCount(){
        let a = fcnt;
        fcnt = 0;
        return a;
    }
};
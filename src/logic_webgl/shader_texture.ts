export const vs_texture = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;
attribute   vec2    a_uv;
varying     vec2    vUV;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
    vUV = a_uv;
}
`;
export const fs_texture = `
#ifdef GL_ES
precision mediump float;
#endif

varying  vec2 vUV;
uniform  sampler2D u_sampler;

void main(void){
    // [ 0, 0, 0, 1 ]  rgba颜色向量
    // gl_FragColor = vec4( vColor, 1. );
    gl_FragColor = texture2D( u_sampler, vUV );
}
`;
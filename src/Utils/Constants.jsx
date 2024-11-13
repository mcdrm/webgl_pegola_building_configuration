export const ConstProps = {
    width: 6,
    length: 4,
    // height: 2.5,
    // pitch: 1.5,
    height: 3.5,
    pitch: 1,
    overhang: 0.25,
    freeOverhang: 0.1,
    roofAlpha: Math.atan(1 / 12), // Math.atan(pitch / 12)

    woodColor: '#FFD595'
}

export const ConstFenceProps = {
    stonePillarBaseSize: 0.6,
    stonePillarSize: 0.5,
    stonePillarHeight: ConstProps.height / 3,
    stonePillarBaseHeight: 0.03,
}

export const ConstWoodPergolaProps = {
    roofBowHeight: 0.25,
    thickness: 0.05,
    pillarSize: 0.3,
    pillarBaseSize: 0.4,
}

export const ConstMetalPergolaProps = {
    pillarSize: 0.25,
    pillarGapSize: 0.25 / 6,    // pillarSize / 6
    pillarBaseSize: 0.35,
    endRoofBowHeight: 0.25,
    sideRoofBowHeight: 0.4,
}
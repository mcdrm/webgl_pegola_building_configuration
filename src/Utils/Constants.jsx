export const ConstProps = {
    width: 6,
    length: 4,
    height: 2.5,
    // pitch: 1.5,
    pitch: 1,
    overhang: 0.25,
    freeOverhang: 0.1,
    roofAlpha: Math.atan(1 / 12), // Math.atan(pitch / 12)

    woodColor: '#FFD595'
}

export const ConstFenceProps = {
    stoneFencePillarBaseSize: 0.6,
    stoneFencePillarSize: 0.5,
    stoneFencePillarHeight: ConstProps.height / 3,
    stoneFencePillarBaseHeight: 0.03,
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

export const ConstStonePergolaProps = {
    stonePergolaRoofHeight: 1,
    ridgeCoverTopWidth: 0.1,
    ridgeCoverSideWidth: 0.1,
    ridgeCoverSideThickness: 0.025,
    pillarSize: 0.25,
    pillarHeight: ConstProps.height / 3 * 2,
    pillarBaseSize: 0.35,
    roofUnderBowSize1: 0.3,
    roofUnderBowSize2: 0.05,
    roofUpperBowSize1: 0.2,
    roofUpperBowSize2: 0.1,
}
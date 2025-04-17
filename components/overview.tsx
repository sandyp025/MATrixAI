import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Research Overview</CardTitle>
          <CardDescription>AI-Assisted Customization of 3D-Printed Biomaterials for Tissue Engineering</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            3D bioprinting builds tissue-engineered constructs by depositing bioinks in precise geometries. However,
            balancing bioink formulation, extrusion settings, and cell viability is challenging: slight shifts in one
            parameter (e.g., viscosity, pressure, temperature) can drastically affect outcomes. Traditional
            trial-and-error approaches are laborious and low-throughput, often requiring dozens of manual experiments to
            identify workable settings for a single bioink–cell combination.
          </p>
          <p className="mt-4 text-muted-foreground">
            Machine learning offers a powerful solution by learning from a limited set of well-controlled experiments to
            predict outcomes across untested parameter combinations. This dashboard presents a supervised-learning
            framework for bioprinting optimization using a Random Forest classifier to predict cell viability
            categories.
          </p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Bioprinting Techniques</CardTitle>
          <CardDescription>Comparison of major bioprinting approaches</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="extrusion">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="extrusion">Extrusion-Based</TabsTrigger>
              <TabsTrigger value="inkjet">Inkjet</TabsTrigger>
              <TabsTrigger value="laser">Laser-Assisted</TabsTrigger>
            </TabsList>
            <TabsContent value="extrusion" className="space-y-4">
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/2">
                  <Image
                    src="/bioprinter-extrusion.png"
                    width={300}
                    height={200}
                    alt="Extrusion-based bioprinting"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium">Extrusion-Based Bioprinting</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A continuous filament of bioink is deposited layer by layer through a nozzle.
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Can handle high-viscosity inks and high cell densities</li>
                    <li>• Suitable for scaffolds with mechanical strength</li>
                    <li>• Lower resolution (~100 µm)</li>
                    <li>• Cells experience shear stress in the nozzle</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inkjet" className="space-y-4">
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/2">
                  <Image
                    src="/bioprinting-droplets.png"
                    width={300}
                    height={200}
                    alt="Inkjet bioprinting"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium">Inkjet (Drop-On-Demand) Bioprinting</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Bioink droplets are ejected from a printhead in response to thermal or piezoelectric actuation.
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• High resolution (tens of microns)</li>
                    <li>• Minimal shear stress on cells</li>
                    <li>• Limited to low-viscosity inks (&lt;10 mPa·s)</li>
                    <li>• Risk of satellite droplets and nozzle clogging</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="laser" className="space-y-4">
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/2">
                  <Image
                    src="/intricate-bio-fabrication.png"
                    width={300}
                    height={200}
                    alt="Laser-assisted bioprinting"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium">Laser-Assisted Bioprinting</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A laser pulse induces localized vaporization of an energy-absorbing layer, propelling a cell-laden
                    bioink onto the substrate.
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Nozzle-free (eliminates clogging)</li>
                    <li>• High resolution and gentle on cells</li>
                    <li>• Complex setup</li>
                    <li>• Potential thermal damage if parameters are not carefully tuned</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
          <CardDescription>Experimental dataset details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Bioink Composition</h4>
              <p className="text-sm text-muted-foreground">2% w/v alginate, 5% w/v gelatin hydrogel</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Sample Size</h4>
              <p className="text-sm text-muted-foreground">150 total prints (120 training, 30 testing)</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Parameters Varied</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Nozzle temperature: 180–210 °C</li>
                <li>• Print speed: 20–40 mm/s</li>
                <li>• Cell density: 5–15 ×10⁶ cells/mL</li>
                <li>• Viscosity: 2–4 Pa·s</li>
                <li>• Layer height: 0.2–0.4 mm</li>
                <li>• Crosslink time: 30–60 s</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Evaluation Method</h4>
              <p className="text-sm text-muted-foreground">
                Live/dead fluorescent staining and structural integrity assessment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
